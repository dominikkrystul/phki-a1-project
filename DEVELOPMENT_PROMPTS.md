# Development prompts

- Three prompts used to build and prepare the project.
- Original wording preserved.

### Prompt 1 — Initial responsibility experience

```text
Keep total token consumption minimal for this run.
Build my PHKI A1 digital project in this empty repository. Use plain HTML, CSS, and a small amount of vanilla JavaScript. No framework, dependencies, backend, or real database.
Project context
My project explores this question:
“How does relying on AI coding agents affect a junior web developer’s ability to identify security risks before deploying a website that handles users’ personal data?”
Responsibility is my main philosophical lens. I want the audience to experience the decision to approve a website that appears to work, then reconsider their decision after discovering a hidden security problem.
This is a deliberately constructed fictional scenario. Do not present it as evidence that an AI model independently produced insecure code.
Work in separate phases
Complete each phase before starting the next. Keep reading, implementation, and verification separate. Do not repeatedly scan the repository or run checks in a loop.
Phase 1 — Read and plan
- Read the repository’s applicable AGENTS.md instructions.
- Perform one shallow file listing. The repository should be empty; preserve anything already present.
- Ignore unrelated folders and historical documentation. Keep context far below 272K tokens.
- Briefly state the file structure and planned audience journey before editing.
Phase 2 — Build
Create:
- index.html — the complete experience.
- styles.css — the styling.
- script.js — navigation, demo interactions, and temporary audience choices.
- README.md — how to open the project, the fictional scenario, and the simulation’s limitations.
- PROCESS.md — an honest record of what AI created and space for my own process notes.
The website must work by opening index.html directly in a browser.
1. Introduce the situation
Explain briefly that the audience is reviewing a website built by a junior developer using an AI coding agent.
Show a small notice: “Fictional interactive scenario. Use the provided demo details only.”
Do not reveal the password storage problem yet.
2. Let the audience try the website
Include registration, login, and an account screen.
Use fixed dummy details:
- Name: Alex Morgan
- Email: alex@example.test
- Password: DemoOnly!2026
Provide a “Use demo details” button. Keep the fields read-only so nobody enters personal information.
Simulate successful registration and login with JavaScript. Do not claim this is real authentication.
3. Ask for a deployment decision
After the account screen, show:
“Registration works. Login works. The account page opens.”
Ask:
“Would you approve this for deployment? What would you need to know before saying yes?”
Offer:
- Approve deployment
- Request more information
Let the audience optionally enter a short reason or question. Keep it only in memory and show it again during reflection.
Do not mention plain-text passwords or suggest the specific hidden problem at this stage. Avoid marking either choice as a quiz answer.
4. Reveal the hidden problem
After the audience makes their decision, reveal a simulated database table containing the fixed dummy account. Show that the password is readable and stored as plain text.
Build this table from a fixed JavaScript object. Clearly label it “Simulated database — dummy data.”
Explain briefly that functional testing alone did not establish how passwords were stored. Real systems should use an appropriate password hashing method.
If the audience requested more information, frame this as a discovery during review. Do not imply they approved deployment.
5. Show the fictional consequence
Introduce a separate hypothetical continuation:
“Imagine the website was released without fixing this issue. A few weeks later, an unauthorized person obtains a copy of the database.”
Explain that readable passwords increase the harm of the leak. The scenario does not establish how the database was accessed.
Possible consequences:
- Someone could access affected accounts.
- Reused passwords could put other accounts at risk.
- The company must investigate, secure the system, and respond to affected users.
Keep GDPR as a short supporting note. Mention appropriate security and conditional breach notification duties under Articles 32–34. Fines are possible, not automatic. Link to:
https://eur-lex.europa.eu/eli/reg/2016/679/oj
6. Return to responsibility
Show the audience’s earlier choice and any reason they entered.
Ask:
- What did you know when you made your decision?
- Who should have checked password storage?
- Who had the power to delay deployment?
- What responsibility remains with the developer and company when AI writes the code?
Keep the focus on judgment, responsibility, and the limits of a working interface.
Provide a restart button that clears the temporary choices.
My own contribution
I will independently write observations and critical annotations about the decisions and missed checks.
In PROCESS.md, leave clearly marked empty sections for:
- My observations
- My interpretation of the deployment decision
- My annotations about responsibility and missed checks
- My changes after reviewing the prototype
Do not write these answers for me or describe AI-generated material as my independent work.
Design
- All interface text in English.
- Minimal black, white, and gray styling.
- Clear typography, whitespace, and short text.
- No gradients, decorative dashboards, excessive cards, emojis, or dramatic hacker visuals.
- Responsive layout, visible keyboard focus, proper labels, and accessible buttons.
- Reveal one stage at a time.
- Render audience text safely with textContent, never innerHTML.
Simulation boundaries
- No real database, network requests, analytics, cookies, or browser storage.
- All account records are fixed dummy data.
- Keep audience choices in memory only; clear them on reload or restart.
- Do not build an actual insecure authentication service.
- Document that the database exposure and timeline are fictional.
Phase 3 — Single-pass verification
- Review the created files once for broken references and unintended data storage or network requests.
- If browser tools are available, make one verification pass covering both deployment choices, the reveal, reflection, and restart. Include one narrow-screen visual check.
- Fix concrete issues found. Recheck only the affected behavior once.
- If browser tools are unavailable, state that the browser experience was not checked.
- Finish with a short list of files created, how to open the project, and any remaining limitations.
```

### Prompt 2 — Northline Studio portal and database simulation

```text
Keep total token consumption minimal. Work only in this repository and stay well below 272K input tokens.
I want to improve my existing PHKI project. It currently looks like a plain assignment page. I want a believable fictional company website with registration, login, and a dashboard, followed by the responsibility scenario.
Use HTML, CSS, and vanilla JavaScript. Keep it static and suitable for Vercel. No framework or backend.
Phase 1 — Read and plan
Do not edit yet.
- Read applicable AGENTS.md instructions.
- List the repository once and read only the files involved in the current website.
- Preserve my existing project content and any personal process notes.
- Do not scan unrelated directories or historical documentation.
- Briefly explain which files you will change or create, then continue to Phase 2.
Phase 2 — Build the website
Fictional company
Use “Northline Studio”, a fictional design company with a client portal.
Create a consistent website with:
- A simple text logo and header navigation.
- A footer with the company name, fictional copyright, and a small “Student project · fictional demo” notice.
- White, light gray, dark text, and one restrained accent color.
- Clear spacing and concise English copy.
- No gradients, excessive cards, emojis, or decorative AI styling.
Make it responsive and accessible, with proper labels and visible keyboard focus.
Registration and login
On desktop:
- Left side: company introduction and a short explanation of the client portal.
- Right side: the registration or login form.
- Include links to switch between registration and login.
On mobile, stack the introduction above the form.
Use these fixed fictional details:
- Alex Morgan
- alex@example.test
- DemoOnly!2026
Provide a “Use demo details” button.
Registration should create the demo account in the simulated database. Login should check that account and open the dashboard. Show a useful message if someone tries to log in before registering.
Only accept the supplied demo identity and password. Explain this beside the form so visitors do not enter real credentials. Do not store arbitrary user input.
Dashboard
After login, show a believable client portal with:
- A welcome message using the registered name.
- A small list of fictional design projects and their statuses.
- Account details.
- A logout button.
Keep the dashboard simple, but make it feel like part of the company website.
Exportable database simulation
Create a small browser-based database simulation using localStorage. No external database service.
- Keep database operations in one small file, such as database.js.
- Registration adds the fixed demo account.
- Store the dummy password as readable text to support the fictional scenario.
- Clearly document that this is deliberately simulated insecure storage, not production authentication.
- Keep login state in sessionStorage.
- Store only fixed dummy records, never real credentials or the audience’s written reflections.
- Handle unavailable browser storage gracefully.
Create a separate database viewer, such as database.html, which I can open directly during my presentation.
It should:
- Show the actual demo records used by registration and login.
- Display ID, name, email, password, and creation time in a readable table.
- Clearly say “Simulated database · dummy data only”.
- Include “Download JSON” to export the current records.
- Include “Reset demo data”, with confirmation before clearing.
- Render values safely with textContent.
- Explain that the data belongs to this browser and is not shared between visitors.
Include a fixed example export at data/demo-database.json so the submitted repository contains an inspectable database example even before someone uses the website.
Do not call the viewer secure or protected. It is part of a public fictional demonstration. Keep it out of the main customer navigation so it does not reveal the scenario early.
Keep the responsibility experience
Preserve the educational flow, but show the realistic company website first.
1. The audience registers, logs in, and sees the dashboard.
2. A separate “Review for deployment” action opens the project scenario.
3. Explain that the junior developer used an AI coding agent and that registration, login, and the dashboard appear to work.
4. Ask:
   “Would you approve this for deployment? What would you need to know before saying yes?”
5. Offer “Approve deployment” and “Request more information”, with an optional short reason.
6. Only after the decision, reveal the readable password in the simulated database.
7. Show a hypothetical continuation: the website is released without fixing it, and a few weeks later an unauthorized person obtains a database copy.
8. Return to the audience’s original decision and ask who should have checked, who could delay deployment, and who is responsible.
If the audience requested more information, acknowledge that choice. Do not say they approved the release.
Keep audience choices and reasons in memory only. Clear them on restart.
Explain that readable passwords worsen the consequences of a leak. Do not suggest they caused the database access.
Keep GDPR as brief supporting context. Fines are possible, not automatic:
https://eur-lex.europa.eu/eli/reg/2016/679/oj
This is a constructed fictional scenario. Do not claim it proves that AI independently generated unsafe code.
Submission documentation
Update README.md with:
- How to run the website using a local static server.
- How registration, login, and the database viewer work.
- How to export and reset the simulated database.
- Why each visitor has a separate browser database.
- How to deploy the static site to Vercel.
- The limitations of the simulation.
Do not deploy or create external services.
Create SUBMISSION.md with a short checklist for:
- Source files.
- The included example database JSON.
- An exported database JSON after running the demo.
- Screenshots of registration, login, dashboard, deployment decision, database reveal, and reflection.
- A PDF containing selected screenshots, short captions, and the eventual hosted URL.
Do not invent a Vercel URL or claim deployment is complete.
Preserve PROCESS.md. Record the changes as AI-assisted work. Leave my independent observations and critical annotations for me to write.
Phase 3 — Verify once
After implementation:
- Review the changed files once.
- If browser tools are available, make one verification pass through registration → login → dashboard → deployment decision → reveal → reflection.
- Check the alternative “Request more information” branch.
- Check that the database viewer shows the same registered account, JSON export works, and reset clears the demo records.
- Include one mobile layout check.
- Fix concrete issues and recheck only the affected behavior once.
- Do not add dependencies just for testing or repeat checks without a reason.
Finish with how to open the website and database viewer, what files were created, and anything you could not verify.
```

### Prompt 3 — Vercel deployment preparation

```text
Keep total token consumption minimal. Work only in this repository and stay well below 272K input tokens.

I’m happy with the website. Check whether this repository is ready for deployment on Vercel and prepare anything necessary. I will deploy it myself.

Preserve the current design, content, and project flow. Only fix concrete deployment issues or bugs that prevent the demo from working.

## Phase 1 — Inspect

Do not edit or run the website yet.

- Read applicable AGENTS.md instructions.
- Perform one repository listing.
- Read only the entry pages, referenced CSS/JavaScript, database simulation, and existing deployment configuration.
- Identify how Vercel should serve this project.
- Check for broken paths, missing files, case-sensitive filename mismatches, localhost URLs, and assumptions that only work with file://.
- Check that no secrets, real personal data, or actual credentials are included.
- Confirm that all stored account data is fixed fictional demo data.
- Do not scan unrelated folders, Git history, or historical documentation.

Briefly state any issues found, then continue.

## Phase 2 — Prepare

- Fix only confirmed issues.
- Ensure the main website opens at `/` and the database viewer remains accessible at its actual URL.
- Preserve relative asset paths and direct access to the existing HTML pages.
- Keep this a static HTML, CSS, and JavaScript project.
- Do not add a framework, backend, database service, or dependencies.
- Add Vercel configuration only if the project actually needs it. Do not add a catch-all rewrite that breaks the database viewer.
- Preserve all personal notes and submission materials.
- Exclude local/editor files from deployment only where necessary. Do not delete my files.

Update README.md with exact Vercel settings for this repository:

- Root Directory.
- Framework Preset.
- Build Command, including whether it should be left empty.
- Output Directory, including whether an override is needed.
- Any required environment variables, or explicitly say none.

Also document:

- The database is simulated in each visitor’s browser.
- Local demo records will not transfer to the Vercel URL.
- Visitors need to register the dummy account on the deployed site.
- JSON export allows the demo database to be submitted separately.
- This project is a fictional demonstration, not production authentication.

Do not deploy, connect accounts, create external resources, or invent a hosted URL.

## Phase 3 — Verify

Use a local HTTP server, not file://.

If browser tools are available, make one verification pass covering:

- Main page and assets load without failed requests or JavaScript errors.
- Registration → login → dashboard.
- Logout and login again.
- Both deployment decision branches.
- Database reveal and reflection.
- Direct access to the database viewer.
- Database JSON export and reset.
- Reload behavior and useful handling when no demo account exists.
- One mobile layout check.

Fix concrete failures. Recheck only the affected behavior once. Do not run repeated scans, full test suites, or install testing dependencies.

If browser tools are unavailable, perform one static review and clearly state which interactions remain unverified.

Finish with:

1. Whether the repository is ready for Vercel, and the evidence for that conclusion.
2. Any changes made.
3. The exact deployment settings.
4. A short checklist for checking the live Vercel URL after I deploy.
5. Any remaining limitations or checks you could not perform.

Do not claim the live deployment works until the actual Vercel URL has been checked.
```

