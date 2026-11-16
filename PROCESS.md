# Process record

## My project decisions

- I chose responsibility as the main PHKI concept. Power supports the discussion about who can stop deployment.
- I focused on junior developers using AI coding agents.
- I designed a fictional website with deliberately readable password storage.
- My lecturer suggested asking the audience about deployment before revealing the problem.
- I used this order to let people reconsider their decision after receiving more information.
- The original requirements are saved in [DEVELOPMENT_PROMPTS.md](DEVELOPMENT_PROMPTS.md).

## AI contributions

- I used ChatGPT and Codex. The saved prompts document the coding agent's tasks.
- The agent generated the initial HTML, CSS and JavaScript.
- It added the dummy account, staged journey and responsibility questions.
- It also produced interface wording, responsive styling and accessibility provisions.
- AI helped implement the animated presentation and its speaking script.
- Codex prepared an initial reflection draft from the project evidence.
- This process update was also edited by Codex using the avoid-ai-writing skill.

## Changes during development

- The first version looked like an assignment page.
- I asked the agent to turn it into the fictional Northline Studio website.
- I kept the deployment decision and password reveal.
- The agent added registration, login and a client dashboard.
- It added a database viewer with JSON export and reset controls.
- Fixed dummy records moved from temporary memory to `localStorage`.
- A demo login marker uses `sessionStorage`.
- Audience choices and written reasons stay in memory. Reloading clears them.
- The separate presentation now has eight scenes. It includes the fictional consequences and a contribution scene.
- Git commit `3ddb4eb` added Vercel integration and website navigation to the presentation.

## Recorded checks

- JavaScript syntax checks and `node verify.cjs` passed during the earlier AI-assisted review.
- Browser checks covered registration, login and the dashboard.
- They covered both deployment choices, the reveal, reflection and restart.
- An HTML-shaped audience note appeared as literal text.
- The viewer showed matching records. JSON download and reset were checked.
- Reset updates were checked across browser tabs.
- The 390-pixel mobile check found no horizontal overflow.
- Its preview is saved in `screenshots/mobile-preview.jpg`.
- Storage failures were checked with assertions. Browser privacy settings need separate testing.
- Submission screenshots and the hosted project are documented in [DIGITAL_PROJECT_SUBMISSION.md](DIGITAL_PROJECT_SUBMISSION.md).

## Responsibility and limits

- Password storage needs its own review, even when login works.
- The readable password was deliberately requested for the teaching scenario.
- This example cannot measure how often AI agents generate vulnerabilities.
- The fictional exposure assumes someone obtains a database copy.
- Reviewing generated code and authorizing release require human judgment.
- Junior developers need review support and a way to delay deployment.

## Personal notes still to add

- Describe what I personally checked in the generated code.
- Record any audience reactions or further lecturer feedback.
- Explain ChatGPT's specific role alongside Codex.
- Confirm which learning statements match my experience.
- Add any rehearsal results and further browser or projector checks.
