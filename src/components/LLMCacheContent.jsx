import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

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
          .map((line) => (line.trim() ? line.split(/\s+/) : []))
          .filter((arr) => arr.length > 0);
        const count = split.reduce((sum, arr) => sum + arr.length, 0);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Render as bullet list
  let cumulative = 0;
  return wordsByLine.length === 0 ? (<LoadingSpinner />) : wordsByLine.length > 1 ? (
    <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
      {wordsByLine.map((lineWords, lineIdx) => {
        const startIndex = cumulative;
        cumulative += lineWords.length;
        return (
          <li key={lineIdx}>
            {lineWords.map((word, wIdx) => {
              const globalIdx = startIndex + wIdx;
              return (
                <span
                  key={wIdx}
                  style={{
                    opacity: globalIdx < visibleCount ? 1 : 0,
                    transition: "opacity 0.1s ease-in",
                  }}
                >
                  {word}
                  {wIdx < lineWords.length - 1 ? " " : ""}
                </span>
              );
            })}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>{wordsByLine[0].join(" ")}</p>
  );
};

export default LLMCacheContent;
