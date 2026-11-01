# PHKI A1 — Northline Studio

A static fictional design company client portal followed by an interactive responsibility review. HTML, CSS, and vanilla JavaScript only; no dependencies, build, backend, or external database.

## Run locally

From this repository run `python3 -m http.server 8000`, then open http://localhost:8000/ . Open http://localhost:8000/database.html separately for the presentation viewer. Stop the server with Ctrl+C. Use a static server rather than file URLs so both pages reliably share the same storage origin.

## Demo journey

1. Register using **Use demo details**: Alex Morgan, alex@example.test, DemoOnly!2026. The fields are read-only and only this identity is accepted. Registration adds one fixed dummy account to localStorage; repeating it preserves the existing account and creation time.
2. Switch to login and use the same details. Login checks the registered record; trying before registration shows a message. A fixed session marker in sessionStorage keeps login in that tab. The dashboard shows fictional design projects and the registered account.
3. Select **Review for deployment**, choose approval or more information, and optionally write a short reason. The readable password appears only after the decision. Continue through the hypothetical leak and responsibility reflection. The more-information branch acknowledges review, not approval.
4. **Restart and clear my choices** clears the decision and note, logs out, and returns to registration. It keeps the dummy database for inspection. Logout also clears audience choices. Reload clears choices but can restore the demo session. Use the viewer to delete the account.

## Database viewer and export

Open `database.html` on the same site address and browser as the portal. This is a public demonstration page, not a secure or protected viewer. It is deliberately absent from customer navigation; a link appears after the scenario decision.

The table displays the actual registered record: ID, name, email, readable dummy password, and creation time (UTC). **Download JSON** exports the current records (an empty array before registration). **Reset demo data** asks for confirmation, removes only this demo’s localStorage key and the viewer tab’s session marker, and refreshes the table. Other open portal tabs detect the removed record and return to registration. The viewer updates when another tab registers or resets data.

`data/demo-database.json` is a fixed inspectable example with an illustrative timestamp. It is not automatically loaded into the browser database. A live export uses the actual registration timestamp.

Each visitor has a separate database because localStorage belongs to their browser profile and site origin (scheme, hostname, and port). Different browsers, private windows, localhost ports, and Vercel domains do not share it. No records are uploaded or shared between visitors. Blocked storage, quota errors, or invalid records produce a message; the simulation requires usable localStorage and sessionStorage rather than silently pretending persistence worked.

## Deploy to Vercel

This repository is ready to serve as a plain static site. No deployment has been performed or hosted URL verified. Import the repository in Vercel and use these settings:

| Setting | Value |
| --- | --- |
| Root Directory | Repository root (`.`); leave the root-directory field at its default, with no subdirectory selected. |
| Framework Preset | Other |
| Build Command | Leave empty; no build command or build step is required. If overriding a prefilled command, enable its override and clear the value. |
| Output Directory | Repository root (`.`). With Other and no `public` folder, Vercel serves the root by default; no override is needed. If an existing project has a different output override, set it to `.`. |
| Install Command | Leave empty; there are no dependencies to install. |
| Environment Variables | None. |

No `vercel.json` or catch-all rewrite is needed. Vercel should serve `index.html` at `/` and the viewer directly at `/database.html`, with the existing relative CSS and JavaScript paths unchanged.

The database is simulated in each visitor's browser. Local demo records will **not** transfer to the Vercel URL: visitors must register the dummy account on the deployed site. Preview and production domains also have separate storage. Download JSON from the viewer to submit the demo database separately; the export does not upload or migrate records. This is a fictional demonstration, not production authentication.

After deployment, check the actual hosted URL:

- Open `/` and `/database.html` directly; confirm styles/scripts load without failed requests or JavaScript errors.
- Register the dummy account, log in, log out, and log in again. Reload and confirm the demo session restores.
- Follow both deployment decisions through the database reveal and reflection; confirm restart clears the audience note.
- Verify matching viewer records, download JSON, and confirm reset removes the account. Login should then explain that registration is needed.
- Check the layout on a narrow mobile screen. Record the real hosted URL in the submission only after these checks.

## Responsibility and limitations

Guiding question: “How does relying on AI coding agents affect a junior web developer’s ability to identify security risks before deploying a website that handles users’ personal data?”

This deliberately constructed fictional scenario is not evidence that AI independently generated unsafe code and does not empirically answer that question. The database exposure and “a few weeks later” timeline are hypothetical. Readable passwords worsen the harm of a leak; the scenario does not establish how the database was accessed. Neither audience choice is a quiz answer.

Readable dummy storage is deliberately insecure for teaching. This is not production authentication: anyone can inspect or alter browser storage, bypass the interface, or open the public viewer. Real systems require server-side authentication, appropriate password hashing, authorization, and wider security review.

Only the fixed dummy account and a fixed session marker are persisted. Audience choices and reasons stay in page memory and are cleared on reload or restart; never enter personal information. Table values and reflections use textContent, not HTML insertion. There are no analytics, cookies, or application API requests. Static assets load from the site; the GDPR link opens an external source. Browser extensions, download history, and password managers are outside the prototype’s control.

GDPR Articles 32–34 support appropriate security and conditional breach notification duties. Fines are possible, not automatic. This is not a full legal assessment. Source: https://eur-lex.europa.eu/eli/reg/2016/679/oj

## Review and submission

Check registration → login → dashboard → both deployment choices → reveal → consequence → reflection → restart. Check login before registration, logout, reload, viewer synchronization, JSON download, reset cancellation/confirmation, blocked storage, keyboard focus, and mobile layout. Creation-time verification is reported in the delivery message; this checklist is not a claim that every browser was tested.

Use `SUBMISSION.md` for deliverables. Independent observations and critical annotations remain yours to write in `PROCESS.md`.

`node verify.cjs` runs the dependency-free database and reference checks. `screenshots/mobile-preview.jpg` is the development mobile preview; capture the complete submission screenshot set separately.
