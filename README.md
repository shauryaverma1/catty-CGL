# Purr & Petal 🌷🐈

A cozy, responsive SSC CGL study companion built with React, Vite, and TypeScript.

## Development

```bash
npm install
npm run dev
```

## Academic content status

This initial milestone uses clearly labelled placeholder data only. The SSC CGL 2026 syllabus mapping is not confirmation of the 2027 syllabus. Content must not be labelled approved until syllabus mapping, factual sourcing, and independent answer review are complete.

## Scripts

- `npm run dev` — start Vite
- `npm run build` — type-check and build
- `npm run preview` — preview the production build


## Deploy to Vercel

This repository's app is at the repository root: `package.json`, `index.html`, and `vite.config.ts` are at the top level. Import this GitHub repository into Vercel and keep the **Root Directory** as `./` (the repository root). Choose the **Vite** framework preset or allow Vercel to detect it. Use build command `npm run build` and output directory `dist`. Install command can remain Vercel's default npm install/ci behavior.

The app currently uses in-memory React state to switch dashboard sections; it does not use URL-based client-side routing. Paths such as `/syllabus`, `/practice`, `/review`, and `/study` are not implemented routes, so no SPA rewrite is included. Normal refreshes at the root URL are supported. If URL-based routes are added later, add a deliberate Vercel rewrite and tests for those routes.

### Environment variables and secrets

No environment variables or external API credentials are currently required by this frontend. Do not add tokens or private credentials to the repository. If a future integration requires a secret, configure it in **Vercel → Project → Settings → Environment Variables** for the intended environments; server-only secrets must never use the `VITE_` prefix because Vite-prefixed values are exposed to browser code.

### Deploy steps

1. Sign in to Vercel and choose **Add New → Project**.
2. Connect GitHub if prompted, then import `shauryaverma1/catty-CGL`.
3. Confirm the Root Directory is `./` and Framework Preset is Vite (or automatic detection).
4. Confirm Build Command is `npm run build` and Output Directory is `dist`.
5. Leave environment variables empty for the current application, then select **Deploy**.
6. Wait for Vercel's build and deployment result. Future pushes to the connected branch can trigger deployments automatically.

A successful GitHub Actions build checks the code; it does not by itself mean Vercel has deployed the website.
