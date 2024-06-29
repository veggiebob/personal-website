import { SERVER_PATH } from "./constants";

export const translateInput = async (input, mode) => {
  try {
    const path = "/translatebf2spl";
    const params = mode === "ai" ? "/ai" : "";
    const res = await fetch(
      SERVER_PATH(path + params),
      // "http://localhost:8081" + path + params, 
      {
      method: "POST",
      body: input,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Headers": "*",
        "Content-Type": "text/plain",
        "Content-Length": input.length
      },
    });
    const text = await res.text();
    const HTMLText = text.replace(/\n/g, "<br/>");
    return HTMLText;
  } catch (err) {
    console.log(err);
  }
};
