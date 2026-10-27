# South America Library Atlas

A SPECS Lens with an interactive South America atlas on an inclined antique library desk. All 12 sovereign countries have real geographic outlines, flags and offline reference summaries. Country panels rise from the map, return before switching, and close back into their countries. North/Central/South enlargement and fixed Up/Down/X controls use SIK and UIKit.

Open `southAmerica.esproj` in Lens Studio **5.23.2**. The build and tests were verified in Interactive Preview; no SPECS device was used. Look down about **22 degrees** toward the desk for the main composition. Aim and click/pinch a country, use the regional controls to enlarge small countries, and select Full map to return.

* Design: [devpost/design-brief.md](devpost/design-brief.md)
* Verification: [Assets/Tests/Results.md](Assets/Tests/Results.md)
* LEAF scenario registration: [Assets/Tests/LeafIndex.ts](Assets/Tests/LeafIndex.ts)
* Country reference sources: [Assets/AtlasData/SOURCES.md](Assets/AtlasData/SOURCES.md)

**All five done criteria have passing LEAF coverage. The additional IK control scenario also passed (6/6 total).** Application compilation and runtime checks passed. Real-glasses comfort and hand-tracking reliability remain unproven.

The library desk and bookcase were generated with SPECS. Country geometry, architectural detail and map supports are parametric. The experience uses bundled data and does not need runtime internet access.

Generated caches, editor workspaces, local integration settings and private signing keys are excluded from version control. Keep `.meta` files with their assets. Lens Studio regenerates `Cache/` and `Support/` when opening the project.

## Resume

The project has been saved, all six final LEAF scenarios passed, and the exact Lens-side pass lines are in `Assets/Tests/LEAF-preview-evidence.log`. The complete map, flag, fixed close control and longest country page were reviewed together in Preview. The library was also checked after moving and looking around.

Next session can start with a visual review and design refinements. There are no known unfinished done criteria. The repository is local only; it has not been published or pushed.
