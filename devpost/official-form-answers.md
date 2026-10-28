# Official form answer worksheet

Live Devpost fields checked 2026-10-28 for [Learn AR with SPECS](https://learn-specs.devpost.com/). This is a local worksheet, not a submitted form. Re-fetch fields before the final action. All TODO responses require the participant's answer; do not infer them from the account name, timezone, design approval or rules-review confirmation.

## Identity, eligibility and links

| Field ID | Exact label | Required | Local response |
| --- | --- | --- | --- |
| 29102 | Submitter Type | Yes | TODO: choose `Individual`, `Team` or `Organization`. |
| 29104 | If Submitting On Behalf Of An Organization, What Is The Organization Name? | No | TODO only if applicable; otherwise leave blank. |
| 29103 | Submitter Country of Residence | Yes | TODO: participant's actual country, selected from the official form. |
| 29106 | Age of majority | Yes | TODO: participant attestation, not checked automatically. |
| 29107 | Eligible jurisdiction | Yes | TODO: participant attestation, not checked automatically. |
| 29108 | Not a Sponsor or Devpost employee | Yes | TODO: participant attestation, not checked automatically. |
| 29091 | Provide a URL to your public code repository on GitHub, GitLab or Bitbucket. | Yes | Candidate: `https://github.com/malet-pr/southAmericaLens`. Verify public access and final contents; metadata lookup returned 404. |
| 29105 | Link to a social post you made about your project (optional) | No | Leave blank unless the participant provides a link. Optional and does not affect judging. |

Checkbox statements from the current form:

- **29106:** “I am at least the age of majority where I live (18 or older in most places) at the time of entry.”
- **29107:** “I do not live in a country, state, province or territory excluded by the Official Rules (including Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea, and any country under comprehensive U.S. sanctions).”
- **29108:** “I am not an employee, representative or agent of Snap Inc. or Devpost, or a member of their immediate family or household, and I am not a judge of this hackathon.”

## Technology answer

**29092 — Explain how your project meets the main technology requirement.** Required. Draft answer for review:

> I planned South America Library Atlas with the Devpost Learn skill pack; the approved design brief is included in `devpost/design-brief.md`. Codex built and refined the SPECS Lens through the CLAD plugin and Lens Studio MCP in Lens Studio 5.23.2. Spectacles Interaction Kit and SpectaclesUIKit provide country selection, region navigation and the reading controls. SPECS mesh generation produced the antique desk and bookcase, while TypeScript builds the map geometry and coordinates the animated card flow. LEAF integration scenarios verify all five done criteria plus control input, text fit for every country page and first-use guidance. Eight scenarios passed in Lens Studio Preview. The running Lens uses bundled reference data and has no runtime AI or internet requirement. I reviewed readability and movement in the simulator; I do not have physical glasses.

## Experience questions

These are the official choices, with no answer preselected. The build history may inform an answer, but the participant must choose their own experience and opinions.

| ID | Exact question | Allowed answers |
| --- | --- | --- |
| 29100 | Had you used Lens Studio before this hackathon? | `Never`; `Tried it once or twice`; `I've built Lenses before` |
| 29093 | Did CLAD build what your design brief described? | `Yes, on the first try`; `Mostly, after a few fixes`; `Only partly, I had to change the idea`; `No` |
| 29094 | Which step took the most time for what you got out of it? | `Setting up Lens Studio`; `Connecting the Lens Studio MCP`; `Installing the CLAD plugin`; `Planning with the skill pack`; `The CLAD build`; `Testing in the preview`; `Recording the demo video` |
| 29095 | Did the cost of AI (tokens, credits or a usage limit) affect what you did? | `No, I never thought about it`; `I thought about it but changed nothing`; `I cut scope or switched to a cheaper model`; `I hit a usage limit during the build`; `It stopped me from finishing something I wanted to do` |
| 29098 | How likely are you to use Specs and Lens Studio again, at work or in your personal projects? | `Very unlikely`; `Unlikely`; `Not sure`; `Likely`; `Very likely` |
| 29101 | How much did this hackathon help you develop new skills or knowledge? | `Not at all`; `A little`; `Somewhat`; `A lot`; `Significantly` |
| 29099 | Did this change what you think makes a good AR app? | `Yes, a lot`; `Somewhat`; `No` |

All seven answers: **TODO**.

**29096 — Where did you get stuck, or nearly quit?** Required. Suggested wording from the recorded build history; participant approval or edits needed:

> Initial setup was the main blocker. Lens Studio and the agent connection did not work reliably, even after restarting both. I followed the organizers' suggestion to install the older Lens Studio version, 5.23.2, and resumed there. During the build, we also iterated on readability and controls. The finished design matched what I wanted and I could read the cards and move around the simulated library without difficulty.

**29097 — If Snap could fix one thing in CLAD or Lens Studio, what would it be?** Required. Suggested wording for participant review, not an assumed opinion:

> Make setup and connection failures easier to diagnose, including a clear compatibility check and an actionable message when the installed Lens Studio version cannot connect properly with CLAD or the MCP.

## Media and final checks

- Public YouTube video URL: **TODO**. Less than three minutes, showing the working Lens Studio Preview.
- Screenshots: **TODO**. Follow `devpost/demo-plan.md`.
- Public repository: verify the configured origin rather than creating a duplicate automatically. Before any public push, check tracked content for secrets and confirm third-party redistribution terms and LFS assets.
- No separate website, ZIP upload or Codex session ID is requested by the current form.
- Re-fetch current requirements and show the final, concrete project packet before any external submission action. Do not fill eligibility checkboxes or send answers without the required user confirmation.
