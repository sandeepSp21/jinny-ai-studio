# Jinny AI Studio

A mobile-friendly, free-hostable starter website for creating AI video scene prompts.

## What works now
- Scene-by-scene prompt creation
- Copy individual prompts or all prompts
- Save projects in the current browser using local storage
- Download prompts as a text file
- Optional POST integration to an API endpoint you control
- Installable PWA shell

## Important limitation
This is not an AI video model. It does not generate MP4 video by itself. Real generation needs a video model/provider and compute. Free hosting does not mean unlimited free GPU generation. Do not put a private API key into a public website; visitors can inspect browser code and network requests.

## Free static hosting: GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a new public repository named `jinny-ai-studio`.
3. Upload `index.html`, `style.css`, `app.js`, `manifest.webmanifest`, and `sw.js` to the repository root.
4. Open repository **Settings → Pages**.
5. Under Build and deployment choose **Deploy from a branch**.
6. Choose `main` and `/ (root)`, then Save.
7. Wait for the Pages URL to appear. Open it on your OPPO Reno11.
8. In Chrome use menu ⋮ → Add to Home screen (or Install app, if shown).

## Alternative free static hosting
Cloudflare Pages can deploy the same static files from a GitHub repository. Free plans and limits may change; check the host's current terms.

## Connecting real video generation
The optional endpoint field expects a backend that accepts POST JSON:
{
  "prompt": "...",
  "style": "3D Indian cartoon",
  "aspect_ratio": "9:16",
  "duration": "5 seconds",
  "scenes": [{"title":"Scene 1","prompt":"..."}]
}
It should return JSON, for example:
{"status":"queued","job_id":"..."}
Then extend the backend to poll job status and return a downloadable MP4 URL. Keep provider secrets on the backend, never in this static frontend.

## Free/low-cost generation paths
- Try reputable providers' free credits/free tiers when offered; these are limited and can change.
- Run an open-source video model on a GPU computer you control. This can avoid per-generation API charges but still uses hardware, electricity, storage, and setup time.
- An Android phone is suitable for operating the website and editing clips, but generally not for running large text-to-video models locally.
