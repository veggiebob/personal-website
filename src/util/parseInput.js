import { SERVER_URL, IS_DEV } from "./constants";

export const parseInput = async (input, parseMode, outputMode) => {
  try {
    const res = await fetch((IS_DEV && SERVER_URL) + "/parse", {
      method: "POST",
      body: input,
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": input.length,
        "Parse-Mode": parseMode,
        "Output-Mode": outputMode,
      },
    });
    const text = await res.text();
    return text;
  } catch (err) {
    console.log(err);
  }
};
