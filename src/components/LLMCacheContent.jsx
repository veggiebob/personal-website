import React, { useState, useEffect } from "react";
import { loadMUIComponents } from "./LazyMUIComponents";
import "../styles/LLMCacheContent.css";

// Global speed (words per interval)
export let WORD_PERIOD = 100;
const MAX_WORD_REVEAL_TIME = 2000;

// Default retry config
const DEFAULT_MAX_RETRIES = 10;
const DEFAULT_RETRY_DELAY = 5000; // ms
const FETCH_TIMEOUT = 3000; // ms per attempt

const validateResponseJSON = (res) => {
  if (!res.body || typeof res.body !== 'string') {
    console.error("Invalid response format:", res);
    throw new Error("Invalid response format: 'body' must be a string");
  }
};

const styleMarkdown = (text) => {
  // Split on ** and make every other element bold
  const parts = text.split('**');
  
  return parts
    .map((part, index) => {
      const trimmedPart = part.trim();
      if (!trimmedPart) return null; // Skip empty parts
      
      // Even indices are regular text, odd indices are bold
      if (index % 2 === 0) {
        return trimmedPart; // Regular text
      } else {
        return <span key={index} className="markdown-bold">{trimmedPart}</span>; // Bold text
      }
    })
    .filter(part => part !== null); // Remove null entries
}

const LLMCacheContent = ({
  cache_key,
  prompt,
  use_personal_info = false,
  direct = false,
  maxRetries = DEFAULT_MAX_RETRIES,
  retryDelay = DEFAULT_RETRY_DELAY,
}) => {
  const [wordsByLine, setWordsByLine] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalWords, setTotalWords] = useState(0);
  const [wordPeriod, setWordPeriod] = useState(WORD_PERIOD);
  const [muiComponents, setMuiComponents] = useState(null);
  const [muiLoaded, setMuiLoaded] = useState(false);

  // Load MUI components on mount
  useEffect(() => {
    const loadMUI = async () => {
      try {
        const components = await loadMUIComponents();
        setMuiComponents(components);
        setMuiLoaded(true);
      } catch (error) {
        console.error('Failed to load MUI:', error);
        setMuiLoaded(true); // Still set to true to show fallback
      }
    };
    loadMUI();
  }, []);

  // Advance visible words count
  useEffect(() => {
    let intervalId;
    if (totalWords > 0 && visibleCount < totalWords) {
      intervalId = setInterval(() => {
        setVisibleCount((prev) => Math.min(prev + 1, totalWords));
      }, wordPeriod);
    }
    return () => clearInterval(intervalId);
  }, [totalWords, visibleCount, wordPeriod]);

  // Helper: fetch with timeout
  const fetchWithTimeout = (url, options = {}) => {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      fetch(url, { ...options, signal: controller.signal })
        .then(res => res.json())
        .then((data) => {
          validateResponseJSON(data);
          clearTimeout(id);
          resolve(data);
        })
        .catch((err) => {
          clearTimeout(id);
          reject(err);
        });
    });
  };

  // Helper: retry logic
  const fetchWithRetry = async (url, options) => {
    let attempt = 0;
    while (attempt < maxRetries) {
      attempt++;
      try {
        const res = await fetchWithTimeout(url, options);
        return res;
      } catch (err) {
        if (attempt === maxRetries) throw err;
        await new Promise((r) => setTimeout(r, retryDelay));
      }
    }
  };

  // Fetch and split into lines & words
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetchWithRetry(
          "https://api.veggiebob.com/llm-cache",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cache_key, prompt, use_personal_info, direct }),
          }
        );
        const body = res.body;
        if (!isMounted) return;
        const lines = body.split(/\r?\n/);
        const split = lines
          .map((line) => (line.trim() ? line : ''))
          .filter((line) => line.length > 0)
          .map((line) => {
            const styled = styleMarkdown(line);
            const words = [];
            let wordIndex = 0;
            
            styled.forEach(part => {
              if (typeof part === 'string') {
                const partWords = part.split(/\s+/).filter(w => w.trim().length > 0);
                partWords.forEach(word => {
                  words.push({ text: word.trim(), isBold: false, index: wordIndex++ });
                });
              } else if (part && part.props) {
                // Bold JSX element
                const boldText = part.props.children;
                const partWords = boldText.split(/\s+/).filter(w => w.trim().length > 0);
                partWords.forEach(word => {
                  words.push({ text: word.trim(), isBold: true, index: wordIndex++ });
                });
              }
            });
            return { original: line, words };
          });
        const count = split.reduce((sum, lineObj) => sum + lineObj.words.length, 0);
        setWordsByLine(split);
        setTotalWords(count);
        setWordPeriod(Math.min(WORD_PERIOD, MAX_WORD_REVEAL_TIME / count));
        setVisibleCount(0);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [cache_key, prompt, use_personal_info, direct, maxRetries, retryDelay]);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Render as bullet list
  let cumulative = 0;
  return wordsByLine.length === 0 ? (
    muiLoaded && muiComponents ? (
      <div>
        {Array.from({ length: 4 }).map((_, index) => (
          <muiComponents.Skeleton
            key={index}
            variant="text"
            width={240 - index * 30}
            height={20}
            sx={{ 
              bgcolor: 'var(--color-border-light)', 
              mb: 0.5,
              display: 'block'
            }}
          />
        ))}
      </div>
    ) : (
      <div>loading no skeleton</div>
    )
  ) : wordsByLine.length > 1 ? (
    <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      {wordsByLine.map((lineObj, lineIdx) => {
        const startIndex = cumulative;
        cumulative += lineObj.words.length;
        return (
          <li key={lineIdx}>
            {lineObj.words.map((wordObj, wIdx) => {
              const globalIdx = startIndex + wIdx;
              return (
                <span
                  key={wIdx}
                  className={wordObj.isBold ? "markdown-bold" : ""}
                  style={{
                    opacity: globalIdx < visibleCount ? 1 : 0,
                    transition: "opacity 0.1s ease-in",
                  }}
                >
                  {wordObj.text}
                  {wIdx < lineObj.words.length - 1 ? " " : ""}
                </span>
              );
            })}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>
      {wordsByLine[0] ? wordsByLine[0].words.map((wordObj, wIdx) => (
        <span
          key={wIdx}
          className={wordObj.isBold ? "markdown-bold" : ""}
        >
          {wordObj.text}
          {wIdx < wordsByLine[0].words.length - 1 ? " " : ""}
        </span>
      )) : ''}
    </p>
  );
};

export default LLMCacheContent;
