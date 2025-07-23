import { CONFIG } from "../runconfig";

export const translateInput = async (input, mode) => {
  try {
    const path = "/translatebf2spl";
    const res = await fetch(
      CONFIG.serverLocation + path,
      {
      method: "POST",
      body: JSON.stringify({
        body: input,
        ai_mode: mode === "ai",
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    // convert response to json
    const json = await res.json();
    const text = json.body || "No response";
    const HTMLText = text.replace(/\n/g, "<br/>");
    return HTMLText;
  } catch (err) {
    console.log(err);
  }
};
