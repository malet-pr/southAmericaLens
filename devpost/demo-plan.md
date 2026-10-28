# Demo and screenshot plan

Prepared 2026-10-28 for South America Library Atlas. Target length: **2:35**, leaving 25 seconds below the current three-minute limit. Use real Lens Studio Interactive Preview footage. No generated mockups or claims of device testing.

## Recording sequence and narration

| Time | Show | Suggested narration |
| --- | --- | --- |
| 0:00–0:12 | Title over a clean view of the library desk. | “South America Library Atlas is a spatial geography reference for curious learners. Country facts emerge from the place they describe.” |
| 0:12–0:35 | Start at the welcome sign, look down, select Brazil and let its card finish rising. | “The atlas sits on an inclined desk in an old library. I aim at Brazil and click to simulate a pinch. Its color carries into a card that rises into reading position.” |
| 0:35–1:05 | Hold the Basics page so text can be read. Use Down twice, pausing on each page. Show the inactive boundary control and fixed X. | “The flag and country name stay visible while three named pages cover the capital, languages, currency, dated population, climate and religions. Text is deliberately large. Paging controls show when there is nowhere further to go.” |
| 1:05–1:25 | Select Argentina while Brazil is open. Hold for the return and rise. Close with X. | “Only one card is open. The previous card returns before the next rises. Closing sends the card back into its country.” |
| 1:25–1:50 | Choose North, select Suriname, then Full map. Let each transition settle. | “Regional enlargement helps with small countries. Here is Suriname. Full map brings back the complete South America overview.” |
| 1:50–2:10 | Move sideways, look around the bookshelves, then return to the desk. | “The map and library stay in the world as I move. They are placed relative to the starting viewer rather than following the head.” |
| 2:10–2:25 | Briefly show the design brief and the readable test report; return to the live atlas. | “I planned the spatial flow in a design brief. Codex built it through CLAD and Lens Studio MCP. Eight LEAF scenarios passed, covering all five done criteria and all 36 country pages.” |
| 2:25–2:35 | End on the readable country card and map. | “This is simulator footage. I reviewed readability and movement there; comfort and hand tracking on real glasses remain untested.” |

Keep the last card in view as the narration ends. Use simple cuts for repositioning, but leave the switch and close transitions visible in real time. Do not imply that separate takes prove continuous motion or tracking.

## Capture setup

1. Open the saved project in Lens Studio 5.23.2, allow imports to finish, and select SPECS 27 Interactive Preview.
2. Restore the default starting camera position before refreshing. After the Lens starts, look down approximately 22 degrees for the main desk composition. Moving the camera before a reset changes the initial world-placement reference.
3. Frame the full map, card, X and region controls together. Keep text readable at the output resolution, without hiding the map's southern tip. For the room shot, a wider oblique view is appropriate.
4. Hide transient debug/test banners and keep the cursor off text. Avoid showing private account menus, system notifications or unrelated windows. Record the actual rendered Preview.
5. Use Preview clicks as pinches. Wait for each card's roughly 0.4-second transition to complete before the next action.
6. Review the entire recording for readable cards and a visible end-to-end flow. Add English narration or captions, then upload to YouTube as public. Paste the final URL into `devpost-submission.md`.

## Screenshot shot list

Save the real images under `devpost/media/` when available; the paths below are targets, not existing files.

| Target filename | State to capture | Caption |
| --- | --- | --- |
| `01-welcome.png` | Initial level gaze, readable welcome instruction with library context. | “A world-anchored welcome introduces the atlas.” |
| `02-brazil-map.png` | Brazil Basics page, full map, flag, fixed X and region controls visible together. | “Country facts rise from a colorful map on the library desk.” |
| `03-suriname-north.png` | North enlargement with Suriname selected and card settled. | “Regional enlargement supports small-country selection.” |
| `04-argentina-card.png` | Argentina after switching from another country, readable card and map. | “A single reading card updates after the previous one returns.” |
| `05-library-room.png` | Oblique view after a short move, desk and inward-facing bookcases visible. | “The library and atlas stay in place as the viewer explores.” |

Still images establish appearance, not animation order. The video must show the switching and closing transitions.

## Current capture status and technical handoff

No new screenshot or video was captured during the 2026-10-28 preparation pass. Lens Studio MCP confirmed the correct project was open and authorized; Preview configuration reported SPECS 27, Interactive, using the bundled Plane environment.

`QueryRuntimeSceneTool` failed with: “AiPreviewAgent handler was installed but didn't respond after the preview reset. The lens may still be reloading. Retry the tool; if it persists, the lens-side AgentInspectScript may not be running.” Preview automation stopped in accordance with the project's MCP-failure instruction. There was no raw HTTP workaround and no new LEAF run.

The failed tool attempt left untracked `Packages/AiPreviewAgentInspect.lspkg`, `Packages/Icons.lspkg`, `Packages/Motion.lspkg`, their metadata, and an `IconAtlas` plugin directory. These generated files were not included in the preparation commit. No tracked scene or application source change was observed. Inspect these artifacts before any later broad `git add` or new preview-automation setup; do not treat them as part of the verified build.

### Resolved after the user reported compilation errors

Later on 2026-10-28, the user reported TS2307 errors from the inspection package's example scripts. The package imported `UIKit.lspkg` / `InteractionKit.lspkg`, whereas the working atlas uses the Spectacles-prefixed packages. The inspector handler and the three added packages were removed through Lens Studio. The unused IconAtlas plugin was unloaded and archived outside the project at `C:/Users/nmale/AppData/Local/Temp/SouthAmericaAtlas-RemovedInspection-20261028/IconAtlas`.

SPECS 27 Interactive Preview was restored from a paused No Simulation configuration. Compilation and clean startup passed, and all eight LEAF scenarios were rerun successfully. A final Preview panel screenshot was reviewed inline to confirm the welcome view renders; it was not saved as a submission media file. The canonical evidence now records the 2026-10-28 rerun.

Use the working Preview UI or panel screenshot tools for the next media capture. Do not invoke runtime scene-inspection tools that auto-install AiPreviewAgent packages in this project version. The approved atlas design and larger typography were preserved.
