import React, { useState, useEffect } from "react";

// Global speed (words per interval)
// Adjust this variable elsewhere in your app to control the speed
export let WORD_PERIOD = 100;
const MAX_WORD_REVEAL_TIME = 2000;

const LLMCacheContent = ({
  cache_key,
  prompt,
  use_personal_info = false,
  direct = false,
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
        setVisibleCount((prev) => Math.min(prev + 2, totalWords));
      }, wordPeriod); // base interval in ms
    }
    return () => clearInterval(intervalId);
  }, [totalWords, visibleCount, wordPeriod]);

  // Fetch and split into lines & words
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("https://api.veggiebob.com/llm-cache", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cache_key, prompt, use_personal_info, direct }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((text) => {
        if (!text.statusCode) {
          throw new Error(text.body || "Unknown error");
        }
        if (text.statusCode !== 200) {
          throw new Error(`API error: ${text.statusCode} - ${text.body}`);
        }
        const lines = text.body.split(/\r?\n/);
        const split = lines
          .map((line) => (line.trim() ? line.split(/\s+/) : []))
          .filter((arr) => arr.length > 0); // remove empty lines
        const count = split.reduce((sum, arr) => sum + arr.length, 0);
        setWordsByLine(split);
        setTotalWords(count);
        setWordPeriod(Math.min(WORD_PERIOD, MAX_WORD_REVEAL_TIME / count)); // adjust speed based on total words
        setVisibleCount(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cache_key, prompt, use_personal_info, direct]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  // Render as bullet list
  let cumulative = 0;
  return (
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
                    color: globalIdx < visibleCount ? "black" : "transparent",
                    transition: "color 0.1s ease-in",
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
  );
};

export default LLMCacheContent;
