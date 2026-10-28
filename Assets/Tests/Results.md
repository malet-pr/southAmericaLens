# South America Library Atlas — preview verification

Built and verified in Lens Studio **5.23.2**, targeting **SPECS**. LEAF **2.0.2** with SIK/UIKit package **2.0.0**. Tests execute in Preview; no physical glasses were available.

**Verified 2026-10-27 after the readability update: 8/8 LEAF scenarios passed. All five done criteria have coverage. No done criterion is untested.** Each scenario ran serially with diagnostic policy `fail-fast`, so an IK error could not silently fall back to scripted SIK input. The policy is now also the registered scenario default.

| Done criterion | Scenario | Final outcome | What was verified |
| --- | --- | --- | --- |
| 1. Complete map, enlargement, small-country selection, full-map return | `atlas-1-map-region-small-country` | PASS | All 12 country meshes and interactables present; Suriname selection and Full map return work. Actual mesh bounds clear the sidebar in all four regions. Colombia is selectable in North and Ecuador in Central. |
| 2. Country highlight, rising matching-colour panel, name and flag | `atlas-2-rise-highlight-flag` | PASS | Real SIK selection; intermediate rising positions observed; selected country elevated; actual UIKit background has selected country hue at 45% brightness; actual name and flag texture checked; vertical reading pose within the intended distance. |
| 3. All summary fields and fixed X | `atlas-3-all-fields-fixed-close` | PASS | All fields and named pages reached; actual rendered text fits. Up/Down remain visible and fixed, with UIKit inactive state AND actual SIK disablement verified at boundaries. X remains active in the same position. |
| 4. Sequential country switch and animated close | `atlas-4-switch-return-close` | PASS | Old return/close precedes new rise/open; both motion phases observed; new country resets to page 0; previous highlight clears; X returns the panel to its country and hides it. |
| 5. Surrounding library and world anchoring | `atlas-5-world-anchor-walk-return` | PASS | Simulated camera translation and turn leave library, desk, map and open panel transforms unchanged; camera restored and country still readable. Also manually moved/looked around the Interactive Preview, reviewed the side bookcase, and returned to the atlas. |
| Extra IK control check | `atlas-ik-reader-controls` | PASS | IK operates Down and X through real SIK input with fallback disabled. Route is **far-field aim and pinch**, as intended by the brief; this is not a claim of direct-touch reach. |
| Every country at the larger text size | `atlas-readability-all-countries` | PASS | All 12 country titles and all 36 summary pages contain the correct bundled values and fit their actual rendered rectangles at body size 68. Fixed X and scroll-boundary states checked on every page. |
| First-use guidance | `atlas-welcome-world-anchor-dismiss` | PASS | Readable welcome title/instruction present initially; guide stays fixed under camera movement, dismisses after first country selection and remains dismissed after closing the panel. |

Machine-readable outcomes: [LeafRunResults.json](LeafRunResults.json). Exact final Lens-side `DefaultLeafScenarioManager` pass lines: [LEAF-preview-evidence.log](LEAF-preview-evidence.log). Scenario registration: [LeafIndex.ts](LeafIndex.ts).

## Visual review

At level gaze, a world-anchored welcome placard explains looking down and selecting a country. At the 22-degree task pose, the complete map including Tierra del Fuego, Brazil flag/name/X, full enlarged summary and all four region controls are visible together. The panel header and map tip have more clearance than the original layout. The upright region sidebar occupies the left side of the desk; geography reserves x[-10.5,27] cm in every region so enlarged countries cannot move behind it. The map preserves geographic aspect ratio.

Reader body text is 68 instead of 39 (about 74% larger), buttons 54, and page headings 52. Section labels are prominent uppercase plain text, without autoshrink. Pages are named Basics, People & economy, and Climate & religions. Boundary buttons fade and stop receiving SIK input. A managed-component re-enable bug found during verification was fixed; tests assert the actual Interactable state, not only a UI flag. Controls use clear text and a large X.

Reader: 55×33 cm at local [0,128,5]. Initial desk distance: 110 cm. Region toolbar: 15×29 cm at [-20.5,105,22]. Welcome: [0,158,5], dismissed once per Lens run. All remain children of the initially anchored AtlasWorld. The physical inclined platen, brass supports and inward-facing library bookcases remain in place.

These visual observations supplement LEAF: mesh counts and text assertions alone cannot establish recognizability, readability or comfort.

**Logic proven in Preview. Feel unproven on real glasses:** long-term comfort, actual hand tracking, additive-display contrast in a real room and perceived educational advantage over a phone.

## Build contents

* SPECS-generated meshes: `Assets/GeneratedMeshes/LibraryDesk.glb` (90 × 95 × 60 cm) and `LibraryBookcase.glb` (120 × 220 × 28 cm), repeated around the room. No static-mesh backend deviations.
* `AtlasMapMesh.ts`: parametric geographic geometry, precise triangle colliders, borders, region clipping, hover/selection feedback. French Guiana is gray, nonselectable context and is not a thirteenth sovereign country.
* `AtlasMain.ts`: camera-relative initial world placement, sequential 0.4-second panel transitions, scroll and region state, and transition guards.
* `AtlasReaderUI.ts`, `AtlasNavigationUI.ts`, `AtlasLayoutUI.ts`: UIKit reading panel, larger typography, flag textures, fixed controls and region navigation.
* `AtlasWelcomeUI.ts`: first-use world-anchored guidance, dismissed on first valid country selection.
* `AtlasLibraryMesh.ts`: parametric architectural detail and atlas supports.
* `AtlasCountryData.ts`: all 12 offline country summaries, real borders, population reference year and source URLs. See [country data sources](../AtlasData/SOURCES.md).
* Eight additive LEAF scenarios under `Assets/Tests/`. No music, voice, network lookup, cross-session persistence or person sensing is used by the experience.

To rerun: open the LEAF panel, select Preview execution, and run the registered scenarios one at a time. The preview reset may produce a LEAF Plugin state-save warning; the final application compile and runtime checks reported no application errors.
