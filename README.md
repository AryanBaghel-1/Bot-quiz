
# Chronicles of Time (AI History Quiz + Chatbot)

A Next.js app for practicing history MCQs, reviewing your score (correct vs wrong), getting AI feedback on your quiz, and chatting with a **history-only** AI tutor.

## What this project does

- **Quiz**: Take a timed history quiz (random questions per attempt), submit answers, and see your score.
- **Settings / Marks history**: Review your previous marks with **correct vs wrong** counts.
- **AI Feedback (Oracle)**: After a quiz, request AI-generated coaching based on what you missed.
- **History-only Chatbot**: Ask history questions; non-history prompts are rejected by the system instruction.

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- ESLint
- Gemini API (optional; for chatbot + feedback)

## Pages & routes

- `/` — Home
- `/quiz` — Timed quiz + results
- `/feedback` — Feedback form + AI evaluation based on the latest quiz submission
- `/chatbot` — History-only chat experience
- `/settings` — View previous quiz marks (correct/wrong)

### API routes

- `POST /api/chat`
	- Body: `{ message: string, history?: Array<{ role: "user" | "assistant"; content: string }> }`
	- Response: `{ reply: string }`

- `POST /api/feedback`
	- Body: `{ submission: { score: number; total: number; percentage: number; details?: ... }, rating: number, note?: string }`
	- Response: `{ analysis: string }`

## Local storage

The app stores quiz submissions locally in the browser:

- `history-quiz-submission` — the **latest** completed quiz submission (used by `/feedback`)
- `history-quiz-attempts` — an array of attempt summaries for `/settings` (includes correct/wrong counts)

## Getting started

### 1) Install dependencies

Using Bun:

```bash
cd frontend
bun install
```

Or using npm:

```bash
cd frontend
npm install
```

### 2) Configure environment (optional, enables AI)

Create `frontend/.env.local`:

```bash
GEMINI_API_KEY=your_key_here
# Optional:
GEMINI_MODEL=your-model-name
```

If `GEMINI_API_KEY` is not set:

- Chatbot replies with a friendly “API key missing” message.
- Feedback page returns a basic fallback message with your score.

### 3) Run the app

```bash
cd frontend
npm run dev
```

Or:

```bash
cd frontend
bun run dev
```

Then open http://localhost:3000

## Scripts

- `dev` — start the dev server
- `build` — production build
- `start` — run the production server
- `lint` — run ESLint

## Notes

- The quiz uses a fixed duration (90 seconds) and picks up to 10 random questions per attempt.
- The sidebar supports a collapsed mode where icons are shown, and an expanded mode where labels are shown.
- An initial full-screen loading page displays briefly before the app content.

