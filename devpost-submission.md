# South America Library Atlas

Local draft prepared 2026-10-28 for [Learn AR with SPECS](https://learn-specs.devpost.com/). Nothing in this file has been sent to Devpost. Public media and personal form answers are still pending.

## One-line Summary

Explore South America on an antique library desk, where country facts rise from the map into readable, world-anchored cards.

## Problem

For people curious about geography, a country outline and its reference facts often live in separate views. I wanted to explore a quieter, spatial way to connect them: a recognizable map on a library desk, with information emerging from the country the learner selects.

## Solution

South America Library Atlas is a SPECS Lens set in a library inspired by the early 1900s. A colorful South America map rests on an inclined desk. Aim at a country and pinch—or click in Interactive Preview—and its matching card rises into an upright reading position.

The card shows the country's name, flag, capital, official languages, currency, population with reference year, climate and broad religion summary across three named pages. Switching countries returns the previous card before raising the next. A fixed X returns the card to its country. North, Central and South enlargement makes small countries easier to select, with Full map restoring the overview.

## Why This Matters

The map, desk and surrounding library stay in the world as the viewer looks and moves around. The intended benefit is a direct relationship between geography and information at real scale, with the learner free to explore the surrounding space.

The prototype demonstrates that spatial relationship in Preview. It does not establish better learning outcomes than a phone or prove comfort on physical glasses. Its audience is geography learners and curious explorers; no classroom study has been conducted.

## How We Used AI

AI was used during creation. SPECS mesh generation produced the antique desk and bookcase assets, and Codex assisted with implementation, debugging, test scenarios and iteration through CLAD.

The running Lens uses bundled geometry, reference summaries and flag images. It does not call a language model, recognize people, listen for speech or request live data. Country facts have recorded sources rather than being generated at runtime.

## How We Used Codex

The approved [design brief](devpost/design-brief.md) specified placement, interactions, animation order and five done criteria. Codex built the core flow first, added the library environment and authored LEAF scenarios for those criteria.

Iteration focused on visible behavior: larger type, clearer map framing, a world-anchored welcome guide, named pages and disabled controls at page boundaries. Testing caught an input-state issue where a visually inactive control could still receive interaction after re-enabling the panel; the fix and tests check the actual Interactable state.

Eight LEAF scenarios first passed in Preview on 2026-10-27 and passed again on 2026-10-28 after removing incompatible diagnostic tooling. On 2026-10-28, I reviewed the simulator and confirmed that the design matched the plan, the cards were readable and I could move around the room without difficulty. Physical glasses were unavailable.

## Key Features

- All 12 sovereign South American countries have real generalized outlines, distinct colors, selectable geometry and flags. French Guiana is nonselectable context rather than a thirteenth sovereign country.
- Country highlight and a matching-color card rise together; only one card is open at a time.
- Three pages—Basics, People & economy, Climate & religions—use larger text and fixed Up, Down and X controls. Boundary controls visibly fade and stop accepting input.
- North, Central and South enlargement supports small-country selection; Full map restores the overview.
- The welcome guide dismisses after the first selection. The library, desk, map and reading position stay world anchored during the session.
- Bundled content works without runtime internet. Population figures explicitly reference 2024.

## Architecture

Lens Studio 5.23.2 targets SPECS. TypeScript components coordinate a single-panel state machine, geographic meshes and triangle colliders, region views, procedural library detail and world placement relative to the initial viewer.

Spectacles Interaction Kit and SpectaclesUIKit provide the selection and UI controls. `AtlasMain.ts` sequences approximately 0.4-second rise/return transitions and prevents conflicting input during movement. `AtlasMapMesh.ts` handles geographic views and selection; the reader, navigation and welcome components handle UI.

Country data and flags are bundled. Borders come from Natural Earth; population is a World Bank 2024 snapshot; reference summaries use archived Factbook profiles and recorded language references. See [source attribution](Assets/AtlasData/SOURCES.md) for scope and provenance. Standard Lens Studio packages/templates and these reference sources are disclosed third-party inputs; desk and bookcase are generated assets.

LEAF 2.0.2 covers the five done criteria and three additional checks. [Results](Assets/Tests/Results.md), [machine-readable outcomes](Assets/Tests/LeafRunResults.json) and [exact pass evidence](Assets/Tests/LEAF-preview-evidence.log) are included.

## Testing Instructions

1. Clone/download the repository with its assets. If using Git, install Git LFS and fetch LFS content; do not leave package or model pointer files in place of assets.
2. Open `southAmerica.esproj` in Lens Studio 5.23.2. Allow package imports and compilation to finish.
3. Use SPECS 27 Interactive Preview. Start at the default camera position, then look down about 22 degrees toward the desk. The world is placed relative to the camera at Lens start; refresh before a new take only after restoring the starting viewpoint.
4. Click a country to simulate aim and pinch. Read the three pages using Up/Down; check that X stays accessible.
5. Select another country while a card is open, then close it with X. Observe the return-before-rise sequence.
6. Select North, choose Suriname, then select Full map. Region changes close an open card before changing the map.
7. Use WASD to move, Q/E to move vertically, and right-drag or Shift to look around. Return to the desk and confirm that the world did not follow the camera.
8. For automated checks, open the LEAF panel, choose Preview and run the eight scenarios registered in `Assets/Tests/LeafIndex.ts` serially. The latest recorded results are 8/8 passing on 2026-10-28, after Preview recovery.

## Public Demo Link

TODO: add the public YouTube demo URL below. A separate hosted website is not required by the current form. The local demonstration is the Lens Studio Interactive Preview described above; the Lens has not been published for installation on glasses.

## Public Repository Link

Configured origin: [malet-pr/southAmericaLens](https://github.com/malet-pr/southAmericaLens).

TODO: verify anonymous public access, complete asset availability and the final commit. The connected GitHub metadata lookup returned 404 on 2026-10-28; this does not distinguish a private repository from a missing/inaccessible repository. No push or visibility change was made during this preparation pass.

## Demo Video

TODO: public YouTube URL.

The [demo plan](devpost/demo-plan.md) provides a 2 minute 35 second recording sequence, narration and five screenshot targets. Show the working Preview, including paging, switching, closing, enlargement and a brief walk around the library. Keep the final video under three minutes.

## Screenshot Shot List

Capture five real Preview images: the welcome view, a readable Brazil card with the complete map, North enlargement with Suriname selected, an alternate country card, and an oblique room view. Captions and filenames are in the demo plan. No screenshots are claimed as captured in this preparation pass.

## Submission Readiness Notes

- The user accepted the simulator design and readability on 2026-10-28. No application code was changed for preparation.
- All five done criteria have recorded passing LEAF coverage; 8/8 scenarios passed again on 2026-10-28, including text fit for all 36 country pages.
- Registration was verified live and the user explicitly confirmed a current rules review on 2026-10-28. Eligibility attestations and survey choices still require the user's own answers.
- Current official requirements and form fields were checked through Devpost on 2026-10-28. The deadline is November 9, 2026 at 22:00 UTC / 19:00 Buenos Aires. Recheck before the final action. [Official rules](https://learn-specs.devpost.com/rules).
- Remaining substantial work: capture media, record/upload the video, verify public repository access, and complete personal form answers. This packet is a draft, not ready for the final submission action.
- Before a public push, check tracked content for credentials and review third-party asset/data redistribution terms. Source attribution is recorded; a final publication check has not been completed in this pass.
- Live inspection automation failed while preparing captures and introduced an incompatible diagnostic package. That tooling was removed, clean Preview startup was restored and all eight tests passed again. See the diagnostic handoff in the demo plan. Submission media files are still pending.

## Known Limitations

- No physical SPECS device was used. Extended comfort, real hand tracking, physical-world tracking and additive-display contrast remain unverified.
- The virtual library is visually surrounding in Preview; transparent glasses cannot use dark scenery to hide the real room.
- Reference data are snapshots with varied source years. Population is 2024; the Lens does not provide live updates.
- The library beyond the atlas is scenery. There is no voice, live recognition, multiplayer or cross-session persistence.
- The learning advantage over a phone is an intended benefit, not a measured finding.

## TODO Official Form Fields

[Official form answer worksheet](devpost/official-form-answers.md) lists the current field IDs, exact prompts, allowed choices and remaining answers. The technology answer is drafted from the build; personal experience and eligibility responses are intentionally unfilled. No Codex session ID is requested by the current form.
