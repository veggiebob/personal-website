import { SERVER_PATH } from "./constants";

export const parseInput = async (input, parseMode, outputMode) => {
  try {
    const res = await fetch(SERVER_PATH("/parse"), {
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
