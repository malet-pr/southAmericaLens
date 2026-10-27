---
status: approved
---

# Design brief: South America Library Atlas (working title, default)

## The one spatial moment
Explore an interactive atlas of South America on a slightly inclined desk in an old library with an ambiance around the 1900s. Select a country and watch its colorful information panel rise from the map into a vertical reading position.

## Why it belongs on glasses
- Uses: draws in the world and leaves the body free to look around.
- The atlas occupies a library desk at real scale, with information rising out of the geography. The user can look around the surrounding library while the desk and map stay in place.
- Its educational advantage over a phone remains to be judged in preview; spatial presentation is the intended benefit (default interpretation).

## Product or overlay
- Type: product; a virtual atlas and library are the experience.
- What the real version would sense: nothing beyond standard tracking and hand interaction.
- Stand-in for the preview: none needed. Country information is bundled reference content (default), with no live recognition or network dependency.

## Where things live
- Main task: standing at an inclined library desk, looking down slightly at the map and up slightly to its vertical information panel (default posture).
- Library: static, world-anchored scenery surrounding the user, with a circa-1900 library ambiance. It can be explored by looking around; it does not follow the head.
- Desk: world-anchored, approximately 90 cm wide, 60 cm deep, and 95 cm high, with a writing surface inclined about 20 degrees (all dimensions default). Place relative to the initial camera, not at an arbitrary origin.
- Map: approximately 55 cm wide by 40 cm high on the inclined surface (default). Keep South America's recognizable outline and borders for all 12 sovereign countries. Territories must not be depicted as extra sovereign countries (default).
- Reading panel: a single vertical panel above the map, approximately 55 cm wide by 35 cm high (default), within roughly 0.8–1.2 m of the initial viewer (default). Adjust dimensions and desk placement together after previewing.
- Initial composition: aim for roughly 40% of view height for the map and 40% for the open panel, with margins and separation. This is a visual target, subject to readability checks, not a head-fixed layout.
- Use distinct colorful country fills. The panel uses the selected country's color; choose bright readable text and suitable color values for additive display (default implementation). Avoid relying on black text for contrast.

## Hands and input
- Country selection: aim and pinch directly on the map, driven by mouse clicking in Interactive Preview (default).
- Regional enlargement: select a region to enlarge that section, then select a country; provide a large Return to full map button (default flow based on the learner's tentative preference). Keep this simple and ensure small countries can be selected.
- Reading: scroll through the summary using large up/down buttons (default controls); keep the close button fixed and accessible.
- Close: pinch the fixed X button.
- Targets are big and highlight when aimed at.
- Voice: none (default).

## When things show
- Library, desk, and map: remain visible and fixed in the world throughout exploration.
- Selected country: highlight it while its information is open; clear the previous highlight on switching or closing (default).
- Panel: rise from the selected country to the vertical reading position. Its background matches that country's map color. No persistent connecting line, tether, or attachment animation after arrival.
- Panel content: name, flag, capital city, official language(s), currency, population, climate, and main religion(s). Use a concise encyclopedia-style summary, a population reference year, and neutral descriptions. Record source attribution with the bundled data (default).
- Only one panel can be open. Selecting another country returns the old panel into its country, then raises the new country's panel (default choice between the learner's two acceptable behaviors). Reset scroll to the top for the new country (default).
- X: animate the panel back into its country, reintegrating it into the map, then hide it. Rise and return are transitions only; the reading panel does not remain visibly linked to the map.
- Animation duration: about 0.4 seconds each way (default); guard against duplicate selections during transitions (default).
- Regional enlargement: keep the panel's reading position stable and resolve transition endpoints against the current map view (default). Close an open panel before changing map region (default).
- If something needs attention out of view: none; this is user-paced exploration (default).

## Done criteria
Each one can be checked in Lens Studio's preview.
1. See the complete recognizable South America map with all 12 sovereign countries on the inclined desk; enlarge a region, select a small country, and return to the full map.
2. Select a country and see its highlight and matching-color panel rise from it to a readable vertical position, showing the correct name and flag.
3. Use the scrolling controls to reach all summary fields while X remains accessible.
4. Select another country while the panel is open: the old panel returns to its country, then the new panel rises with the new country's content. Press X and see that panel return and disappear.
5. Look and move around the preview to see the surrounding library; verify the library, desk, and map stay fixed in the world, and return to a clear reading view.

## Out of scope
- Live camera recognition, live data, voice, custom or two-hand gestures, multiplayer, and persistence between sessions (default).
- A fully interactive library beyond the atlas desk (default).
- Building during this planning interview.

## Risks and open questions
- Real glasses comfort and hand-tracking reliability: feel unproven.
- Regional enlargement is tentative; confirm its usefulness without making navigation cumbersome.
- Exact size, distance, and inclination are defaults to tune in preview. Eight information fields require scrolling and readable text; the 40%/40% composition may need adjustment.
- A surrounding virtual library can be demonstrated in preview. On transparent glasses, dark scenery cannot fully replace or conceal the real room.
- Country borders, flags, official languages, population year, and nuanced climate/religion summaries require reliable reference sources during the build. Do not invent facts or treat changing population figures as timeless.

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources


