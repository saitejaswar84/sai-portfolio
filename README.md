# Sai Tejaswar Reddy Dalli — Portfolio

A modern, single-page portfolio for an AI/ML Engineer, featuring an **AI chat assistant** (powered by Moonshot AI's **Kimi K2.6** via NVIDIA) that answers visitors' questions about Sai's experience, projects, and skills — grounded in his resume.

Built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**. The chat runs on a serverless function so your API key never reaches the browser.

---

## Quick start

```bash
npm install

# 1. Add your NVIDIA API key so the AI chat works
cp .env.example .env
#    then edit .env and set NVIDIA_API_KEY=nvapi-...

npm run dev          # http://localhost:5173 — chat works locally via a dev middleware
```

Don't have a key yet? The site still runs perfectly — the chat will just show a friendly
"set NVIDIA_API_KEY" message until you add one. Get a key at
<https://build.nvidia.com> (open the Kimi K2.6 model → "Get API Key").

```bash
npm run build        # type-check + production build to /dist
npm run preview      # preview the production build (static only — no chat)
```

> `npm run preview` serves the static build but does **not** run the serverless chat
> function. To test the chat against the production-style API locally, use the Vercel CLI:
> `npm i -g vercel && vercel dev`.

---

## Deploy to Vercel (recommended)

The project is preconfigured for Vercel — the static site is served from `/dist` and
`api/chat.ts` runs as a serverless function.

1. Push this folder to a GitHub repo.
2. Import it at <https://vercel.com/new> (framework auto-detects as **Vite**).
3. In **Project → Settings → Environment Variables**, add:
   - `NVIDIA_API_KEY` = your key
   - *(optional)* `CHAT_MODEL` = `moonshotai/kimi-k2.6` (default)
4. Deploy. Done.

Other hosts (Netlify, Cloudflare) work too — you'd port `api/chat.ts` to their function
format. The chat logic lives in `api/_chat-core.ts` and is host-agnostic.

---

## Customize

Everything is data-driven — you rarely need to touch the components.

| What | Where |
| --- | --- |
| Your name, role, tagline, contact info, **LinkedIn URL** | `src/data/resume.ts` → `profile` |
| Headline stats | `src/data/resume.ts` → `stats` |
| Experience, projects, skills, education, certifications | `src/data/resume.ts` |
| What the AI assistant knows / how it replies | `api/_resume-context.ts` |
| Colors & fonts (theme tokens) | `src/index.css` → `@theme` |
| Resume PDF (the "Resume" button links here) | `public/Sai-Tejaswar-Reddy-Dalli-Resume.pdf` |

> ⚠️ Update `profile.linkedin` in `src/data/resume.ts` — it's set to a placeholder.

If you change the resume facts in `src/data/resume.ts`, mirror them in
`api/_resume-context.ts` so the AI chat stays accurate (it reads from that file, not the UI).

---

## How the AI chat works

- The browser POSTs the conversation to `/api/chat`.
- The serverless function (`api/chat.ts`) calls **Kimi K2.6** through NVIDIA's
  OpenAI-compatible endpoint with a system prompt built from `api/_resume-context.ts`,
  and **streams** the reply back token-by-token.
- Your `NVIDIA_API_KEY` stays server-side. History is capped per request to bound cost.
- Default model is `moonshotai/kimi-k2.6`; override with the `CHAT_MODEL` env var.

## Project structure

```
api/
  chat.ts             # Vercel serverless function (POST /api/chat)
  _chat-core.ts       # shared, host-agnostic streaming logic
  _resume-context.ts  # system prompt grounding the assistant
src/
  components/         # Nav, Hero, About, Experience, Projects, Skills, Education, Contact, ChatWidget…
  data/resume.ts      # all editable content
  index.css           # Tailwind v4 theme + base styles
vite.config.ts        # Vite + Tailwind + dev /api/chat middleware
vercel.json           # deploy config
```
