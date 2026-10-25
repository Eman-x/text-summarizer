# Text Summarizer

A small web app from the **"Building AI-Powered Applications"** workshop.
Paste some text, click **Summarize**, and get a short summary from Google's Gemini model.

The point of the project: **an AI feature is just a normal function call to a model.**
The app works without AI first. Then you switch on one function that sends the text to
Gemini, and the rest of the app stays the same.

## What's inside

| File | What it is |
|------|------------|
| `public/index.html` | The frontend: text area, button, summary, and token/latency stats. |
| `server.js` | The backend (Node.js + Express). Serves the page and handles `POST /api/summarize`. The AI connection is already written, but **commented out**. |
| `.env.example` | Template for your Gemini API key. |

## 1. Run it (no AI yet)

You need **Node.js 22 or newer**. Check with `node --version`.

```bash
git clone https://github.com/Eman-x/text-summarizer.git
cd text-summarizer
npm install
npm run dev
```

Open **http://localhost:3000**, paste some text and click **Summarize**.
You'll see: *"AI integration is not implemented yet."* That's expected.

## 2. Get a free Gemini API key

1. Go to **https://aistudio.google.com/apikey** and create a key.
2. Copy `.env.example` to a new file called `.env`:

   ```bash
   cp .env.example .env
   ```

   On Windows (Command Prompt): `copy .env.example .env`

3. Open `.env` and paste your key: `GEMINI_API_KEY=your-key-here`

> **Never commit `.env` or put your key in frontend code.** `.env` is already in
> `.gitignore`. The key is only read by the server, so the browser never sees it.

## 3. Switch the AI on

Open `server.js`. There are two commented-out blocks, each with a header:

- **AI CONNECTION, PART 1 of 2:** the `summarize(text)` function. It:
  1. reads the API key from the environment,
  2. builds the prompt (our instructions plus your text),
  3. sends one HTTP request to Gemini and times it,
  4. handles errors (bad key, rate limit, model busy),
  5. returns the summary, token counts and latency.
- **AI CONNECTION, PART 2 of 2:** a `try/catch` in the route that calls `summarize()` and
  sends the result back to the page.

To switch them on, select the code lines of each block (the lines starting with `//`, not
the `/* ... */` header) and press **`cmd-/`** (Mac) or **`ctrl-/`** (Windows/Linux). You can
also delete the `// ` at the start of each line by hand.

Save the file. `npm run dev` restarts the server by itself. Click **Summarize** again:
you now get a real summary, with the input tokens, output tokens and latency underneath.

## Things to try

- **Change the prompt** in step 2 of `summarize()`: "as 3 bullet points", "explain it to a
  10-year-old", "in Arabic". Same code, different behaviour.
- **Compare a short and a long text.** More text means more tokens, more cost and more latency.
- **Break it on purpose:** run `GEMINI_API_KEY=wrong-key npm start` and see how the error
  is handled.
- **Check where the key lives:** open your browser's DevTools → Network tab. The browser only
  talks to `/api/summarize` on your own server, never to Google.
- **Try another model:** change `MODEL` at the top of Part 1. See the
  [Gemini models and pricing](https://ai.google.dev/gemini-api/docs/pricing) page.

## Troubleshooting

| You see | Fix |
|---------|-----|
| Still "AI integration is not implemented yet." | Part 2 is still commented out, or the file isn't saved. |
| `summarize is not defined` | Part 2 is on but Part 1 isn't. Uncomment Part 1 too. |
| `SyntaxError` when the server starts | Some lines are still commented, or the header was uncommented too. |
| `GEMINI_API_KEY is not set` | Create `.env` (step 2) and restart the server. |
| `Gemini API error (400): API key not valid` | Copy the key again. Check for extra spaces or quotes. |
| `Gemini API error (429)` | Free-tier rate limit. Wait a minute and try again. |
| `Gemini API error (503)` | The model is busy. Try again in a few seconds. |
| Port 3000 already in use | `PORT=3001 npm run dev` |
