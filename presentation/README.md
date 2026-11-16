# When AI writes the code

## Live presentation

- [Project website](https://phki-a1-project.vercel.app)
- [Interactive presentation](https://phki-a1-project.vercel.app/presentation/)

The current presentation has a dedicated title and a continuous responsibility journey. It contains eight scenes and eleven navigable checkpoints, covering the audience decision, the database reveal, the hypothetical consequence, responsibility, personal judgment and the final decision. It is built with React, strict TypeScript, Vite, Motion, GSAP, Tailwind CSS and Lucide. All runtime assets are local.

## Launch the prepared presentation

From the repository root, start the built site.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory presentation/.site
```

Open http://127.0.0.1:8000/presentation/ and keep the server running. A browser and Python are sufficient for this prepared copy. It works without internet. The original fictional portal remains at `/` and its database viewer at `/database.html`. The latest hosted version is available at https://phki-a1-project.vercel.app/presentation/.

Use a 16:9 display where possible. The 1600 × 900 stage scales uniformly and letterboxes other ratios. Start fullscreen with F. Start T with your first word. The presenter dock starts hidden. Move within 56px of the bottom edge to reveal it, or H to pin it. An unpinned dock retires after 2.2 seconds of inactivity. Controls occupy the bottom margin.

## Controls

| Key | Action |
| --- | --- |
| Right / Space | Next checkpoint |
| Left | Previous checkpoint |
| 1–7 | Jump to scene start |
| F / Escape | Enter / exit fullscreen |
| P | Pause / resume the current security-camera segment |
| T | Start / pause elapsed timer |
| R | Restart, reset timer and audience choice |
| H | Pin / hide dock |
| A / M | Remember approval / request for information |
| ? | Keyboard help |

The dock supplies equivalent actions. Its camera button appears in Beyond the Interface. Advancing or jumping releases a camera pause. Keyboard navigation remains active during movement. Focused buttons retain native Space activation. No scene advances automatically. Timer warnings appear at 5:00, 5:45 and 6:00. Timer and camera pause are independent.

## Story and speaking script

| Scene | Main moment | Allocation |
| --- | --- | --- |
| 1 Introduction | When AI writes the code. / Who takes responsibility? | 0:00–0:10 |
| 2 The Digital Project | It works. / But who's responsible? / browser reveal | 0:10–0:35 |
| 3 The Deployment Decision | Registration, login, dashboard and audience decision | 0:35–1:10 |
| 4 Beyond the Interface | Application layers and plaintext discovery | 1:10–2:05 |
| 5 Three Weeks Later | The fictional consequence of an exposed record | 2:05–2:33 |
| 6 Who Could Have Stopped It? | Responsibility and missed checks | 2:33–3:35 |
| 7 Who did what? | Human judgment and contribution | 3:35–4:40 |
| 8 The Final Decision | Reconsider deployment and the conclusion | 4:40–5:45 |

The presentation is designed to fit within the six-minute limit. An aloud rehearsal is still required to verify delivery time and pauses.

## Beyond the Interface implementation

One GSAP master in `src/animations/security.ts` controls the same browser shell, conceptual layers, camera, background, record selection, inspection line, display mask and final statement. Manual targets are at 0, 3, 7, 10, 13 and 15 seconds. Every segment holds at its target. The current scrub is killed before a new target is chosen. Reverse navigation restores masking and context. P pauses the scrub at its current time.

Motion owns the exterior scene anchor and existing typographic/node components. GSAP owns the separate interior camera and journey elements. Reduced motion seeks the spatial targets immediately. The preference updates during use. CSS 3D provides depth without a new rendering dependency.

## Outputs and submission

- `output/pdf/PHKI_Final_Submission.pdf` is the current static presentation deck.
- `output/title-preview.png` and `output/security-reveal-preview.png` show deterministic title and discovery states.

The repository's `presentation/` source and lockfile are included for reproducibility. Generated folders such as `node_modules/`, `dist/` and `.site/` are local build output and are not part of the source archive.

## Development and packaging

From `presentation/`, install dependencies once with internet access, then run Vite.

```sh
npm ci
npm run dev
```

Production preparation uses the existing scripts.

```sh
npm run build
npm test
npm run package:site
```

The build includes strict TypeScript. Tests cover navigation boundaries, export checkpoints and timer thresholds. `package:site` recreates its disposable `.site/` directory from a fixed list of original files plus the built presentation. It preserves the originals. After regenerating and reviewing the PDF, refresh the archive.

```sh
npm run package:offline
```

## Regenerate the PDF

1. Build and package the site, then start the local server.
2. Open http://127.0.0.1:8000/presentation/?print=1.
3. Print with background graphics enabled, browser headers/footers disabled, margins none and scale 100%. CSS supplies the landscape page size.
4. Save over `output/pdf/PHKI_Final_Submission.pdf`.
5. Render every page to an image and inspect all seven pages, then regenerate the offline ZIP.

The print deck renders explicit static states. It bypasses the GSAP timeline, starts typography masks open and supplies the completed database pose and plaintext directly. `?print=1&scene=4` selects the fourth page. `?capture=1` omits all presenter chrome for interactive screenshots and recording. The PDF contains sharp text and graphics. Browser printing may rasterize the perspective portal on the digital-project page.

## Content boundaries

The portal is the existing deterministic representation of Northline Studio. It uses the original copy, fixed dummy account and project names. It performs no authentication and changes no browser database. The database panel imports the one fixed JSON record. Only supported id, name, email and password fields appear. The users panel and application layers are conceptual representations. They claim no additional backend architecture or stored records.

The unsafe plaintext storage was deliberately specified for this teaching scenario. The inspection line removes a display mask, without depicting decryption or a real breach. The student supplied the personal interpretation. Original prompts document the question, scenario and audience decision. Implementation is AI-assisted. The original website and PROCESS.md retain their existing content.

## Vercel deployment

The current static deployment is live:

- Main site: https://phki-a1-project.vercel.app
- Presentation: https://phki-a1-project.vercel.app/presentation/

| Setting | Value |
| --- | --- |
| Root Directory | Repository root |
| Framework Preset | Other |
| Install Command | `npm ci --prefix presentation` |
| Build Command | `npm run build --prefix presentation && npm run package:site --prefix presentation` |
| Output Directory | `presentation/.site` |
| Environment Variables | None |

No catch-all rewrite is needed. The deployed routes are `/`, `/database.html` and `/presentation/`.
