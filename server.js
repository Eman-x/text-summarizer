// Text Summarizer — the backend
//
// Two jobs:
//   1. Serve the web page in /public
//   2. Answer POST /api/summarize
//
// The AI connection is already written below, but it is switched off
// (commented out). Until you switch it on, /api/summarize returns a placeholder.

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // read JSON request bodies
app.use(express.static("public")); // serve index.html

/* ===========================================================================
   AI CONNECTION, PART 1 of 2: summarize(text) asks Gemini for a summary.

     1. Read the API key from the environment (server only, never the browser)
     2. Build the prompt: our instructions + the user's text
     3. Send one HTTP request to Gemini and time it
     4. Handle errors: bad key, rate limit, model busy
     5. Return the summary, token counts and latency

   To switch it on: select from "// const MODEL" down to the "// }" that
   closes the function, then press cmd-/ (ctrl-/ on Windows).
   =========================================================================== */

// const MODEL = "gemini-3.5-flash-lite"; // fast, and on the free tier
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
//
// async function summarize(text) {
//   // 1. The API key, read from .env on the server
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     throw new Error("GEMINI_API_KEY is not set. Add it to your .env file and restart the server.");
//   }
//
//   // 2. The prompt: tell the model exactly what we want
//   const prompt = `Summarize the following text in 3 to 5 clear sentences.
// Keep the main ideas and key facts. Do not add anything that is not in the text.
//
// Text:
// """
// ${text}
// """`;
//
//   // 3. Call Gemini and time how long it takes
//   const startTime = Date.now();
//
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-goog-api-key": apiKey,
//     },
//     body: JSON.stringify({
//       contents: [{ parts: [{ text: prompt }] }],
//     }),
//   });
//
//   const latencyMs = Date.now() - startTime;
//   const data = await response.json().catch(() => ({}));
//
//   // 4. Handle errors: bad key, rate limit, model overloaded, ...
//   if (!response.ok) {
//     const reason = data.error?.message || response.statusText;
//     throw new Error(`Gemini API error (${response.status}): ${reason}`);
//   }
//
//   const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;
//   if (!summary) {
//     throw new Error("Gemini returned no summary. Try different text.");
//   }
//
//   // 5. Return the summary plus the numbers we want to show
//   const usage = data.usageMetadata;
//   return {
//     summary: summary.trim(),
//     inputTokens: usage.promptTokenCount,
//     outputTokens: usage.candidatesTokenCount + (usage.thoughtsTokenCount ?? 0), // thinking counts as output
//     latencyMs,
//   };
// }

app.post("/api/summarize", async (req, res) => {
  const text = req.body?.text;

  if (typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Please enter some text to summarize." });
  }

  /* AI CONNECTION, PART 2 of 2: call summarize() and send its result to the page.
     To switch it on: select the 7 lines below and press cmd-/ (ctrl-/ on Windows). */
  // try {
  //   const result = await summarize(text);
  //   return res.json(result); // { summary, inputTokens, outputTokens, latencyMs }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(502).json({ error: error.message });
  // }

  // Placeholder. Once the AI connection is on, this line never runs.
  res.json({ summary: "AI integration is not implemented yet." });
});

app.listen(PORT, () => {
  console.log(`Text Summarizer running at http://localhost:${PORT}`);
});
