# Changelog

All notable changes to Simple++ live here, newest first.
The same list is readable inside the app under the **≡ Changelog** tab.

## 0.14.0 — Voxels, a band, and ten looks

### Fixed
- **Exporting to .html didn't work properly.** An export is a snapshot of the
  editor as it stands, and Export became its own tab in 0.13.0 — so exporting
  *while looking at the Export tab* produced a file that opened on the Export
  tab, with the game running correctly behind a page of cards about exporting.
  From any other tab it worked, which is why it seemed random. The clone is
  forced onto the Code view now, and it was checked by exporting from all eight
  tabs.
- Two other things made a working export look broken. The "it saved" message
  went to the console, which lives in the Code tab, so from the Export tab you
  pressed the button and nothing at all happened; there is a result panel on
  the Export tab now. And Safari on iOS 12 has no download attribute — it has
  the property, undefined, so the old `in` test passed and the click silently
  did nothing. The feature test checks the type, and where downloading is
  impossible the file opens in a tab with the share-menu instructions.
- `"\n"` in a string is a real new line.

### Added — the Music tab is a band now
- A song holds up to **eight tracks** playing at once, each with its own
  instrument: **Piano, Bass guitar, Rock guitar, Electric guitar, Acoustic
  guitar, Tin whistle, Beepy, Soft** and **Drums**.
- None of them are recordings. Each is a recipe for one note — which shapes of
  wave and in what mix, how fast it arrives, how long it rings, where the
  filter sits and how far it closes. Rock guitar runs a saw through a
  waveshaper curve, which is what a pedal does; the tin whistle is a sine with
  vibrato and a little band-passed breath behind it. So they cost nothing in
  file size.
- **Drums** are a kit played by row like a drum machine: Kick and Kick 2 at the
  bottom, then toms, clap, rim, snare, hats, ride and crash going up. Rows
  above the kit are dark and refuse notes.
- **Twenty-five rows** instead of fifteen, and a choice of five notes (nothing
  sounds wrong), major, minor or every note.
- **Up to eight pages** of 32 steps, so a song runs a while instead of
  repeating every two bars. ◀ and ▶ move between them.
- Notes are booked on the sound card's own clock a quarter-second ahead rather
  than played when a timer fires, so the music stays in time when the game is
  busy. Measured at 16.0 steps a second against a nominal 16.
- The other tracks show through faintly behind the one you are editing; each
  track has a volume and a mute.
- Songs written before this had one grid and one wave. They open as a one-track
  song at the same pitches with the nearest instrument, so they sound as they
  did.

### Added — Voxels
- The Models tab is now **▣ Voxels**: a box of little cubes you build in
  directly, rather than a stack of flat pictures. Drag turns it; **click a
  face** and a cube sticks to it; **shift-click** or right-click takes one off;
  scroll zooms; Front, Side and Top snap square on.
- **Textured blocks.** Wrap any sprite round the cubes and a brick sprite makes
  brick blocks, with the picture correct on every face. This works because the
  projection is orthographic, which keeps each face an exact parallelogram, so
  a sprite maps onto one with a plain affine transform.
- **Picking is exact.** The visible faces are drawn again into a hidden canvas,
  one flat colour each, and the pixel under the cursor says which face you
  meant. No ray maths, no guessing.
- Only faces with nothing in front of them are drawn — a 240-cube house is 488
  faces, not 1440 — sorted back to front and shaded by which way they point.
- **⬆ Build from a sprite** stands a drawing up and makes it however many cubes
  deep you say.
- **Turning, one axis at a time:** `rotatex`, `rotatey`, `rotatez`, and
  `rotatexby` / `rotateyby` / `rotatezby`, `spinx` / `spiny` / `spinz`,
  `anglex()` / `angley()`, and `stopspin()` halts all three. `rotate()` and
  `spin()` still mean the flat one.
- **Nothing three-dimensional is pixelated any more.** The 3D platformer draws
  each wall column with one stretched image instead of a fillRect per texture
  row — smoother, and faster — and the stage switches its own scaling between
  smooth and sharp depending on what is on it, so sprite games keep their hard
  edges.
- Models built as layer stacks are converted on load: each picture becomes a
  slice of cubes at that height.

### Added — ten looks, and one of your own
- Every theme now comes in **light and dark**. Light Retro is a paper terminal
  with dark ink on warm white; dark Modern is the plain one at night. All ten
  were measured for contrast and for being the shade they claim.
- **🎨 Make one** is a theme maker: every colour is a picker — background,
  panels, buttons, writing, quiet writing, the two highlights, the code box and
  the stage surround — plus corner roundness, edge thickness and lettering.
  **Start from** reads an existing theme so you begin from something you like.
- Buttons can wear a **PNG**: stretched, or 9-sliced so the corners stay sharp
  at any width.
- Writing on an accent-coloured button picks black or white by luminance, so a
  bright accent never leaves an unreadable button.

### Added — what players see before the game
- An **opening card** that fades in and out, with your own words and how many
  seconds. Leave the words empty and it uses the game's name.
- A **loading screen** with your own text, an optional bar, and a picture if
  you want one. The bar tracks the real work — every sound and picture the game
  embeds.
- Both have a **See it** button, so you can watch them without exporting.

### Added — title screens
- **`evenmorefancytitle("The Game")`** turns a wireframe cube in 3D: eight
  points rotated on all three axes with a little perspective, twelve edges each
  a different colour cycling as it goes, then a white flash and the title drops
  onto it. No fill, just lines.
- **Every title screen takes a music track** as its last number, and
  `titlemusic(2)` sets one for whichever title comes next — which is how
  `customtitle` gets one without its list of steps becoming ambiguous.
- **`customtitle` is a little script now.** A step can be written out with its
  own timing and extras:

  ```
  customtitle("My Game", "colour #101040 20", "fade 30", "sfx 2",
              "glide 1 from 0 200 to 320 60 50", "flash", "shake 20", "drop")
  ```

  Fourteen steps: `fade`, `drop`, `spin`, `zoom`, `flash`, `hold`, `colour`,
  `flyby`, `glide`, `shake`, `say`, and `sfx` / `sound` / `music`, which take no
  time and fire once as the play head passes. Plain numbers still work, and a
  step it does not know is named in the error rather than skipped.

### Added — gliding
- `glide(1, 260, 180, 30)` slides a sprite there over thirty frames, easing in
  and out so it starts and stops gently. `glideby(1, dx, dy, frames)`,
  `stopglide(1)`, and `gliding(1)` says whether it is still on its way.

### Added — Pre-made
- Packs can hold a character **two sprites tall** — two halves that stack, so
  it works at the ordinary sprite size. There is a ranger in there to start
  with.

## 0.13.0 — Phones, themes, models, sound effects and three more languages

The biggest release so far. Everything below is new since 0.12.1.

### Added — it works on a phone now
- **iOS 12.5 and up.** Safari 12 cannot parse `?.` or `??` and has no
  `String.matchAll`; one of those anywhere in the file stops the whole script,
  so the page opened blank. All twenty-one are gone, replaced by `firstSet()`
  and `allMatches()` helpers checked against the native versions on empty
  matches, zero-width patterns and multiple capture groups. `inset:` and
  `aspect-ratio` have fallbacks, and the audio context unlocks on the first tap
  the way iOS insists. `smoke-test.mjs` fails the build if any of it comes back.
- **📱 Touch** draws a d-pad and Z / X / C / SPACE over the stage. They press
  the same keys the keyboard does, so a game written for arrows and
  `when key z` already works on a phone with nothing extra to write. It turns
  itself on when the browser reports a touch screen, remembers the choice, and
  exported games carry the buttons with them.
- The layout under 900px stacks the editor above the stage and shrinks the tab
  labels to their numbers. The top bar is one row from 960px up.

### Added — five themes
- **Classic**, **Modern**, **Retro** (a green CRT with scanlines),
  **Futuristic** and **Video game**, in the new **⋯** menu. Every colour,
  corner, border width and font is a CSS variable now, so a theme is one
  attribute and nothing else. The canvases are painted by hand rather than
  styled, so the paint background, the room grid and the song grid ask the
  theme what colour they should be.
- Themes stop at the edge of the editor. Title screens, buttons and the lives
  counter keep the look the game was designed with, so an exported game looks
  the same to everybody however its author likes to sit.
- The top bar was seven coloured buttons wide and wrapped onto two rows.
  Templates, Run and Stop stay out where a beginner will find them; the rest
  moved into the ⋯ menu with the theme picker.

### Added — a sprite can move on its own
- **Frames.** A sprite is a stack of pictures now. **+ Frame**, **⧉ Copy**,
  **🗑 Delete** and **▶ Preview** sit under the drawing, and `play(1, 6)` runs
  them in the game. Deliberately not `animate()`, which flips between different
  sprite *numbers* — a walking player stays sprite 1 and keeps every collision,
  role and room tile that number already has.
- Frame 1 is still `project.sprites[n-1]`, exactly where it has always been, so
  every project ever saved opens unchanged. The extra frames live beside it and
  cost nothing when unused. They follow a sprite through Copy, a size change,
  My Games and exports.
- **Names.** Give a sprite a name and it works anywhere the number does:
  `show("player")` is `show(1)`. Resolved inside `actor()` and
  `ensureSprite()`, so every command takes a name without knowing about it. A
  string that is nobody's name is left alone, so `move("Hello!", 10, 0)` still
  moves writing.
- New: `play`, `playonce`, `stopplay`, `frame`, `frames()`, `frameof()`,
  `playing()`, `spriteof()`.

### Added — a Models tab
- **Pixel art with a depth to it.** A model is a stack of pictures: layer 1 is
  the bottom slice, layer 2 sits on top, and drawing them all turned by the
  same angle makes something you can walk around. A handful of `drawImage`
  calls per model, so it runs at sixty frames a second.
- It is the sprite editor. The same seven tools, the same colours and the same
  canvas handlers — `installPainter()` attaches them to either canvas and
  `paintTarget()` decides whether they are writing to a sprite frame or a model
  layer. The slice below shows through faintly while you draw the next one, and
  the preview turns: drag it, or leave it spinning.
- Each slice is cached shaded by how high up it is, 60% at the bottom to full
  at the top, which is what stops the stack reading as a pile of flat pictures.
- New: `voxel`, `voxelhide`, `voxelput`, `voxelmove`, `voxelsize`, `voxeltall`,
  `rotate`, `rotateby`, `spin`, `stopspin`, `angle()`, `layers()`,
  `voxelx/y/z()`, `modelof()`.
- For flat sprites: `move(1, x, y, z)` takes a fourth number that lifts one off
  the ground, and `thickness(1, 10)` draws it ten pixels deep so it looks solid
  rather than like paper. `thickness(6)` on its own does that to everything.

### Added — an SFX tab
- Short noises built from seven sliders: a pitch, somewhere it slides to, how
  long, how loud, how rough, how much it wobbles, how many times it repeats.
  Underneath, an oscillator and a band-passed noise source crossfaded by the
  roughness slider, so the same seven numbers cover a clean blip and an
  explosion.
- The waveform is drawn above the sliders from those numbers, so moving one
  shows as well as sounds, and every change plays itself back.
- Ten presets — Jump, Coin, Hit, Laser, Explode, Power up, Blip, Step, Alarm,
  Splash — so nobody starts from silence. **🎤 Record** uses the microphone
  where there is one, and **📂 Import** takes a wav or mp3 where there is not:
  iOS 12 has no MediaRecorder, and the button says so rather than failing
  quietly.
- `sfx(1)`, or `sfx("jump")` if you named it.

### Added — an Export tab
- **Web page (.html)** as before, **Project file (.json)**, and two build kits.
- **Desktop kit** — a zip with `game.html`, `main.js`, `package.json` and a
  `BUILD.txt`. `npm install && npm run dist` gives a Windows `.exe`, a Mac
  `.dmg` or a Linux AppImage.
- **Phone kit** — a zip with `www/index.html`, `capacitor.config.json` and a
  `BUILD.txt` walking through Android Studio and Xcode.
- A browser tab cannot compile a program: an `.exe` needs a linker, an `.apk`
  needs the Android SDK, an `.ipa` needs a Mac and Apple's signature. No engine
  does it from inside a browser. So the tab is honest about that and hands you
  the project the real compilers expect. Making a folder downloadable means
  making a zip, so there is a small zip writer here — CRC32 plus stored
  entries, about sixty lines and no library.
- It is honest about Xbox and PlayStation too: both need a registered developer
  account and a devkit you apply for, which is not something an engine can give
  you.

### Added — role-playing games
- Forty-odd blocks for the Undertale and Deltarune shape of game, each usable
  on its own.
- **Talking:** a black box that types itself out with a sprite's face beside
  the words; Z skips to the end and Z again closes it. `askmenu()` types a
  question then lets you pick with the arrow keys, and `chose("Fight")` is true
  on the single frame that choice was made.
- **Hit points:** `stats`, `attack`, `damage`, `heal`, and an `hpbar()` that
  puts its number on the other side when the bar is near the screen edge.
- **A bag:** `give`, `have`, `howmany`, `takeaway`, `bagsize`.
- **Memory:** `remember()` writes to browser storage, so what a game learned
  about you outlives a restart — which is the whole point of it.
- **People:** `npc()` gives a sprite something to say, `nearnpc()` says when
  you are standing next to them, and `follow()` replays the leader's own path a
  set number of steps behind so a party strings out instead of stacking up.
- **The white box:** `arena()` and `soul()` are the box and the red heart,
  `bullet()` marks what hurts, `soulhit()` reports the frame it does and hands
  back what did it.
- **Feel:** `shake()`, `flash()`, `tint()`.
- A **Little RPG** template that is all of it in forty lines.

### Added — seventy more blocks
- **Drawing:** `rect`, `outline`, `circle`, `line`, `pixel`, `ink`,
  `background`, `bigprint`, `middleprint` — so a score panel no longer has to
  be built out of sprites.
- **Sums:** `min`, `max`, `abs`, `sqrt`, `round`, `floor`, `ceil`, `sin`, `cos`
  (in degrees, because nobody learning this wants radians), `clamp`, `between`,
  `pick`, `chance`, `distance`, `angleto`.
- **Words:** `join`, `upper`, `lower`, `length`, `letter`, `piece`, `contains`,
  `number`, `words`.
- **Movement:** `towards`, `push`, `wrap`, `keepon`.
- **Timers:** `timer`, `timerdone`, `timerleft`, `everysecond`, `everyframes`,
  `frame`, `seconds`.
- **Saving:** `savegame(1)` writes the variables, hit points, bag, room and
  where every sprite is standing into a slot that survives the browser closing;
  `loadgame(1)` puts it back.
- The language went from 137 named blocks to 326.

### Added — Python, Lua and C++ in Hard mode
- A dropdown beside the mode buttons picks the language. The engine underneath
  never changes: `S.`, `onStart` and `onFrame` are identical whichever you
  choose, because the code is translated to JavaScript before it runs.
- A function called `start`, `frame`, `update` or `draw` is wired up
  automatically in every language, so registering callbacks is optional now.
- **This is a translator, not the real language,** and it says so in the window
  as well as here. It covers the part of each language you would write a game
  in and nothing beyond: no classes, imports, metatables, templates or
  pointers, and nothing is type-checked. Help lists exactly what is in each.
- Every generated line is mapped back to the line you wrote, so a mistake in
  Python reports *Python error (about line 3)* and points at your Python.

### Fixed
- `"\n"` inside a Simple++ string is a new line now, which every text command
  wanted.
- All eleven templates are run start to finish by the test suite. The earlier
  check only loaded them, which is why nobody noticed one needed Easy mode.

## 0.12.1 — Moving your games to a new address

### Fixed
- **Opening a saved game showed the previous game's code.** `libLoad()` filled
  the editor box as one of its last steps, but several steps before it call
  `save()`, and `save()` reads that box as the truth about the current program —
  so the game just opened was immediately overwritten with whatever was on
  screen beforehand. The box is now filled in before anything can save. The
  copies in the library were never damaged, only what you saw after opening one.

### Added
- **⬇ Backup all** and **⬆ Restore** in My Games. A browser keeps storage under
  the exact address of the website, so moving a site — from `github.io` to
  `pages.dev`, for instance — arrives at an empty shelf while the old games sit
  safe at the old address. Back up on the old site, restore on the new one.
  Restoring never writes over a game already there: a name clash is kept beside
  it under a new name.
- The empty My Games window now explains this, instead of looking like
  everything has been lost.

## 0.12.0 — Endless rooms and four more title screens

### Added — rooms without edges
- **A room can be one screen or endless.** The Rooms tab has a size picker.
  *One screen* is what rooms have always been; *endless* lets the tile grid
  carry on for ever in every direction, which is what `camx()`, `camy()` and
  `camera()` were waiting for. Arrow buttons pan around it and **Home** goes
  back to the start.
- Switching between them keeps your work: one screen becomes the top-left
  corner of an endless room, and coming back the other way says how many tiles
  fell outside the screen rather than dropping them quietly.
- An endless room is stored as a map of positions rather than a fixed array, so
  only the tiles you actually place take up space, and the picture behind the
  game is redrawn a screen at a time as the camera moves.

### Added — title screens
- **`scrolltitle("Go!", 2)`** — a title with sprite 2 drifting diagonally
  behind it.
- **`fanciesttitle("Go!", 1)`** — the screen is black, sprite 1 glides in from
  the left at double size and settles in the middle, leaps off the top, the
  screen flashes white, and the spinning title lands.
- **`customtitle("Go!", 1, 4, 5, 3)`** — your own sequence, from seven numbered
  pieces played in order: 1 fade in, 2 drop and bounce, 3 spin to a stop, 4 a
  sprite flies past, 5 white flash, 6 hold still, 7 zoom out.
- **`titletile(2)`** puts a scrolling background behind *any* title style, and
  **`titlesprite(3)`** chooses the sprite the flying ones use — so
  `titletile(2)` followed by `fanciertitle("Both")` is a spinning title over a
  scrolling background, which is what makes these worth combining.

### Fixed
- A crash on load introduced while adding endless rooms: `blankRoom()` read the
  project's room mode while the project object was still being built.

## 0.11.0 — Music, room tools, pre-made sprites

### Added — music
- **A Music tab.** Songs are numbered the way sprites are. Notes go on a grid,
  time across and pitch up the side, drawn from a five-note scale so anything
  you click sounds like it belongs. Speed and the kind of sound are per song,
  and a song plays back in the editor while the playhead sweeps across it.
- **`music(1)`** plays a song over and over, **`music(1, 0)`** plays it once,
  **`music(0)`** or **`stopmusic()`** stops it. Stopping the game stops the
  music too.
- **`title("My Game", 2)`** plays song 2 while the title screen is up and stops
  it when Play is pressed. `fancytitle()` and `fanciertitle()` take the same
  second number.
- **Import an mp3 or wav** and it becomes that song, played as it is. It is
  stored inside the project, so there is a warning past 1.5 MB and a refusal
  past 4 MB — browser storage is only a few megabytes and the sprites share it.

### Added — editors
- **Fill, line, square and circle in the Rooms tab**, matching the Paint tab.
  Hold **Shift** to fill a square or circle; shapes preview while you drag.
- **⬇ PNG** saves the current sprite as a picture at whatever scale you ask
  for, or type **ALL** to get every sprite laid out as one sheet.
- **📦 Pre-made** — four packs, all drawn for Simple++ and free to use:
  **Template sprites** (everything the built-in templates use), plus
  **Platformer**, **Space** and **Dungeon** sets. Add one sprite or the whole
  pack; nothing you have drawn is replaced.

### Removed
- The **Draw me** generator, replaced by the pre-made packs.

### Not done
- **A 1:1 recreation of the Sonic 1 sprites.** That artwork belongs to SEGA and
  this is a public repository, so copying it in is not something this project
  will do. The **Platformer pack** is original art covering the same ground — a
  runner with two frames, ground, ledges, a spring, a spike, a ring and a
  checkpoint.

## 0.10.0 — Solid collision, room tiles, and less clutter

### Fixed
- **Jumping while running went straight through blocks.** Horizontal movement
  was resolved against the old vertical position and vertical movement against
  the new horizontal one, so a diagonal path could cross a corner that neither
  check ever saw; a fast fall could also skip past a thin platform in a single
  step. Movement is now walked in pieces no larger than a quarter of the sprite,
  testing both directions at each piece and creeping the last pixels so the
  sprite rests flush. Checked against a floor-to-ceiling pillar at jump powers 6
  to 20 and speeds 3 to 10 — blocked every time.
- **More than one wall never worked.** `horizontal(1, 2, 5)` produced a list
  inside a list, and rounding an array of two numbers gives `NaN`, so those
  sprites were silently not solid at all. Lists are flattened before use.

### Added
- **`collision(1, 3)`** — sprite 1 cannot walk into sprite 3, as a sprite or as
  a room tile. Available in every mode, and plain `move()` respects it too, so
  it works in Normal mode where you write the movement yourself.
- **`touchinginroom(1, 3)`** — true when sprite 1 is touching a tile painted
  with sprite 3, for things drawn into a room rather than shown with `show()`.
- **`pause()` and `resume()`.** **P** toggles pause as well, and `when key` and
  button blocks keep running while paused — otherwise the code that resumes you
  could never run, which is a trap rather than a feature.
- **`roomhide(12, 3)`** makes every tile painted with sprite 12 look and behave
  like sprite 3; with one argument they vanish. **`roomshow(12)`** puts them
  back. Drawing, collision and `touchinginroom()` all follow the swap.
- **`room_number()`** and **`paused()`**.
- **✨ Draw me** in the Paint tab. Describe a sprite and it draws one: hearts,
  stars, bricks, trees, flowers, swords, keys, ghosts, faces and monsters, in
  whatever colour you name. Each shape is assembled from rules rather than
  copied from a library, so it works offline and monsters come out different
  every time. With a key set under ⚡ in AI mode it asks that model for a grid
  of colours instead and uses what comes back.
- **New template — Room to Room:** a three-room platformer where walking off the
  right-hand edge starts the next room and the left edge takes you back.

### Removed
- **`.simple` files, share links and the online gallery**, along with the
  `games/` folder and publishing through GitHub issues. Games are kept in
  **My Games** in this browser, and **⬆ Export** writes a web page that plays
  anywhere — which is the part people actually used.

## 0.9.3 — A search box in Help

### Added
- **The Help tab can be searched.** Typing narrows the reference to the lines
  that mention what you asked for, highlights the word, and keeps each
  explanation attached to the command it explains rather than cutting it in
  half.
- **It searches every mode, not just the one you are in.** Anything found
  elsewhere is grouped under a heading naming that mode — so looking up "coin"
  from Normal mode points you at Easy instead of claiming there is nothing,
  which is what the first version of this did and was worse than useless.
- **`/`** jumps to the box when the Help tab is open, and **Clear** restores the
  whole list.

## 0.9.2 — Flips, vehicles, endings

### Added
- **Flip buttons in the Paint tab.** ⇋ mirrors the sprite left to right, ⇅ top
  to bottom. These change the drawing itself and are saved with it — unlike
  `fliphorizontal()`, which only changes how a sprite is shown while a game
  runs.
- **`vehicle(1, 2)`** (Easy). Stand next to sprite 2 and press **E** to climb
  on. Whatever was moving the player — walking, gravity, jumping — moves the
  vehicle instead, the rider sits on top and is carried along, and coins,
  spikes and doors follow whoever is driving. Press **E** again to step off
  beside it with your own controls back.
- **`ending("You win!")`** (Easy, also `theend()`). Everything freezes where it
  is, the picture fades to black over about a second, and the words appear.
- **`pressed(e)`** — true on the frame a key was tapped.

### Fixed
- **A quick key tap could be missed entirely.** Keys were only read once per
  game frame, so pressing and releasing between two frames — easy at thirty
  frames a second — left no trace at all. A press is now recorded the moment it
  happens and read by the next frame whatever its length. This is what made
  mounting a vehicle with **E** feel unreliable.

## 0.9.1 — Questions explain themselves

### Fixed
- **A question used as a command gave a misleading error.** Writing
  `room_changed()` — or `touching(1, 2)`, `whenclick(1)`, `free(...)`,
  `clicked(...)` — on a line of its own reported *"I don't know the command
  'room_changed'"*, which is not true: the engine knows it, it just answers a
  question instead of doing something, so on its own it has nowhere to put the
  answer.

  The message now says that, and shows the line that was meant:

  > "room_changed()" asks a question, it does not do anything on its own.
  > Use it inside an if, like this:  if room_changed

  Every question word is covered, with or without the brackets. Names that are
  both a question and a command — `room`, `size`, `button`, `print`, `move`,
  `speak` — are unaffected.
- An unknown command now points at the Help tab.

## 0.9.0 — Bigger sprites, after start, gallery fixed

### Added
- **Sprites can be bigger than 16×16.** A picker in the Paint tab offers 8, 16,
  24, 32, 48 and 64. Changing it resamples every drawing to the new size and
  rebuilds each room so the tiles stay where they were on screen; the room grid
  is recalculated to suit (64 → 5×4 tiles, 32 → 10×8, 16 → 20×15, 8 → 40×30).

  The size is saved with the project and carried by `.simple` files, share links
  and exported games, so anything you send opens at the size it was made at.
  Templates are drawn at 16 and switch back to it when loaded.
- **`after start`** — a second opening block, run once after everything in
  `when start` has finished and the first frame is on screen. Useful for
  anything that needs the game already set up. Several `when start` blocks are
  allowed too; they all run, in the order written.

### Fixed
- **Games posted as issues never appeared in the gallery.** The gallery asked
  GitHub for issues carrying the label *game-submission*, and the Publish button
  put that label in the pre-filled link. GitHub drops the `labels` parameter for
  anyone without write access to the repository, so every submission from
  anybody but the owner arrived unlabelled and was invisible to the query.

  It now reads **every** issue and keeps the ones that contain a game, whether
  it arrives as a share link, a fenced block, or pasted in on its own. Pull
  requests and ordinary bug reports are ignored. If GitHub refuses the request —
  it allows sixty an hour from one address — the window says so rather than
  quietly showing nothing.

## 0.8.1 — Sprites survive the round trip

### Fixed
- **Shared links and gallery games came back with wrecked sprites.** Each sprite
  was run-length coded into a string of exactly two characters per run: one hex
  digit for the colour, one base-36 digit for the length. That holds only while
  every colour number is a single digit. As soon as a project had more than
  sixteen colours, index 16 encoded as `"10"` — two characters where the decoder
  expected one — and every run after it was read one character out of step. Past
  a certain point it stopped merely corrupting the picture and threw
  *Invalid array length*.

  Runs are now stored as pairs of numbers, which cannot be misread however large
  the palette gets. Links and submissions made before this still open: the old
  string form is still understood on the way in.
- **Files saved before palettes were stored** (anything from 0.7.0 or earlier)
  now load with a rebuilt palette instead of black or magenta squares. The
  drawings themselves were never lost — only the list of what the colour numbers
  meant — so the shapes come back exactly and the missing colours are filled with
  distinct, readable ones. The console says how many were guessed.

### Changed
- Share links and exported games now carry the palette and the frame rate.
- Every saved game is stamped with a format version.
- The sprite, texture and room caches are cleared on load, so nothing from the
  previous project can linger.

### Checked
On a project with **79 colours**, transparency and two rooms, all four routes —
My Games, `.simple` files, share links and exported `.html` — return sprite,
room and palette data **identical byte for byte** to what went in.

## 0.8.0 — Live gallery, twenty new blocks, four bug fixes

### Fixed
- **A saved game came back black.** `gameNow()` never wrote the palette into
  the file, so a project using colours you had added yourself loaded with only
  the original sixteen and every custom index fell off the end. Games now carry
  their palette, their frame rate and their canvas size, and a colour that ever
  does go missing shows up bright pink instead of black.
- **Opening a link overwrote the game you were working on.** Autosave wrote the
  visiting game straight over yours. A game arriving from a link or the gallery
  is now a *visit*: your own project is stashed untouched, autosave is off, and
  a bar offers **Keep this one** or **Back to my game**.
- **Exports contained whatever window happened to be open.** The page was
  serialised live, so an open menu was baked into the file. It is now cloned and
  cleaned first.
- **Fullscreen hid the mouse pointer.**

### Changed
- **Exported games fill the whole browser window** and have no fullscreen
  button — the page already is the game.
- **`touching()` answers for room tiles too**, not just sprites.
- **`resize()` and `size()` work in Normal mode**, not only Easy.

### Added — the gallery is live
- **🌍 Gallery** now lists the games in `games/` *and* every game posted as an
  issue on the repository, reading the packed game straight out of the issue
  body. Publishing really is just posting.
- It refreshes itself every five seconds while open, silently — no spinner, no
  "refreshing" message. The network itself is asked at most once a minute,
  because GitHub allows sixty calls an hour from one address and a five-second
  poll would burn that in five minutes. The list you see is always current
  within that.

### Added — blocks
- **`else`** and **`else if`**.
- `changeroomby(1)` and `room_changed` — usable bare, or `room_changed(2)` to
  ask about one room. The flag stays readable for a whole frame afterwards, so
  it does not matter where in your code you check it.
- `addcoin(80, 60)` — a single coin at that spot; only the one you touch goes.
- `fancytitle("My Game")` drops the title in from the top and bounces it once.
  `fanciertitle("My Game")` drops it in spinning on its middle, slowing down and
  always settling face-on.
- `exittitle()` and `entertitle()`.
- `fliphorizontal(1)` and `flipvertical(1)` (`fliph`/`flipv` too).
- `speak("Hello")` — reads it out, where the browser has a voice.
- `button("Play", 10, 200)` puts a button on the screen; `when button("Play")
  clicked ... end` runs when it is pressed, and `clicked("Play")` asks in an if.
- `whenclick(1)` / `when_click(1)` — true on the frame you click that sprite.
- `move("Hello World!", 10, 0)` shifts writing, not only sprites.
- `chatbot("Hi!")` — a dialogue box with a text field. It answers from its own
  small set of replies, or from a real model if you have connected one.
- `fps(30)` sets the frame rate from code.
- `mousex()` and `mousey()`.

### Added — everything else
- **Dialogue types itself out**, letter by letter, with a soft tick.
- **The 3D platformer is rebuilt.** One ray per screen column instead of one per
  two, and every wall column is sampled from the actual pixels of whichever
  sprite you painted on that tile — so it is your room exactly, brick for brick,
  rather than a flat colour. Coins stand where you painted them and are hidden
  properly by walls in front of them. Space hops. About 3–4 ms a frame.
- **An FPS slider** under the stage, with a live count of what you are actually
  getting.
- **A mouse position readout** under the stage, for reading off coordinates.
- **PNG import has a "Limited colours" tick.** Leave it off and the image keeps
  its own colours, which are added to the palette.
- **The ⚡ real-AI key works with any provider:** Claude, ChatGPT, Groq,
  OpenRouter, or any other OpenAI-shaped endpoint you type in. The chatbot block
  uses it too.

### Still to do
- Sprites bigger than 16×16, and a select/move tool in the paint editor.

## 0.7.0 — Camera, 3D, export, paint tools

### Fixed
- **Holding jump against a ceiling stuck you to it.** Upward movement was being
  resolved with the downward landing code, so bonking your head set
  "standing on something" and the held jump key fired again immediately. Going
  up now stops you dead without counting as ground.

### Added — blocks
- `camera(1)` follows a sprite with the whole view; `camx(1)` and `camy(1)`
  follow it in one direction only. Text, the life counter and dialogue stay put.
- `resize(1, 10)` grows a sprite by ten pixels (negative shrinks it);
  `size(1, 32)` sets it outright. Collision boxes follow the new size.
- `dialogue("Hello World!")` / `say("Hello World!")` — a black box across the
  bottom of the screen, words wrapped to fit. (The old `say()` that printed to
  the console is now `note()`.)
- `every frame unless <condition>` — the block pauses itself while the
  condition holds and resumes on its own afterwards.
- `3dplatformer(1, 2, 3)` — **experimental**. The room you painted becomes a
  maze seen from the inside: solid tiles are walls textured from sprite 2's
  picture, tiles painted with sprite 3 float in it as coins, and the arrow keys
  walk and turn. Runs at about 2 ms a frame.
- `solid()`, `door()` and the other Easy commands now all report correctly when
  used outside Easy mode.

### Added — paint
- **Tools:** pencil, eraser, flood fill, line, box, circle and an eyedropper.
  Hold **Shift** while dragging a box or circle to fill it in. Shapes preview
  as you drag.
- **A colour wheel.** Pick any colour and add it to the palette; the palette is
  saved with the project, and ↺ puts back the original sixteen.
- **A canvas size slider** for how big the drawing area is on screen. The sprite
  is still 16×16 — this is zoom, not resolution.

### Added — export
- **Export to `.html`**: one file with the whole game inside it and no editor
  around it. Double-click and it plays; about 200 KB.
- **Export to `.simple`** for carrying on later.
- The window explains `.exe`, `.apk` and `.ipa` honestly: a web page cannot
  compile a binary, and no browser-based engine does. It names what does —
  Electron or Tauri for Windows, Capacitor for Android, Capacitor plus a Mac and
  an Apple developer account for iPhone — all of which take the exported
  `.html` as their input. On a phone, "add to home screen" gets you an icon
  without any of that.

### Added — AI mode
- **It remembers.** Each Run carries on from the last description, so you can
  add one line at a time. "start over" or unticking 🧠 remember clears it.
- **It can be a real model.** Paste an Anthropic API key and Claude writes the
  program instead of the built-in reader. The key is kept in your browser and
  sent only to Anthropic; if the call fails for any reason the built-in reader
  takes over, so Run always does something.
- New vocabulary: cameras, resizing, dialogue, 3D and pausing.
- Fixed: "falls" was being typo-corrected into "walls"; "a camera that follows
  the player" also created a chaser; "bigger by 16" read the sprite number as
  the amount; an exclamation mark was stripped off dialogue.

### Still to do
- **Sprites bigger than 16×16 ("high quality" mode).** The canvas slider only
  changes how big the editor looks. Real higher-resolution sprites change the
  room grid and every project already saved, so it needs its own pass rather
  than being bolted onto this one.

## 0.6.1 — Fullscreen

### Added
- **⛶ Fullscreen** button under the stage, and **F** as a shortcut (ignored
  while you are typing in the editor or a text box). Escape leaves, as usual.
- The 320×240 picture is scaled by a whole number wherever one fits, so pixels
  stay square and sharp rather than blurring. The rest of the screen is black
  and the game keeps its proportions instead of stretching.
- Keys and clicks behave identically while blown up — title-screen buttons are
  hit-tested against the scaled canvas, so they land where you press them.

## 0.6.0 — A real global gallery, and no more multiplayer

### Removed
- **Multiplayer.** It only ever worked between two browser tabs on the same
  computer, which is not what anyone means by multiplayer. Gone with it:
  `share()`, `me()`, `players()`, `mate()`, the Lobby button and the Tag
  template.

### Fixed
- **My Games typed backwards.** The search box rebuilt the whole panel on every
  keystroke, so the input was destroyed and recreated with the caret back at
  position 0 — each new letter landed in front of the last. The panel is now
  built once and only the list of games is redrawn.
- **Naming and publishing a game is no longer done with pop-up prompts.** There
  are Name and Author boxes in the window itself, used by Save, Share link,
  Save .simple and Publish alike.

### Added
- **🌍 Gallery** — one list of games, the same for everybody who opens the site.

  GitHub Pages has no database. It serves files, full stop. So the gallery *is*
  a file in this repository: `games/index.json` lists the games and each one is
  a `.simple` file beside it, fetched by the page at runtime. **Publish to
  gallery** opens a GitHub issue already filled in with your entire game (as a
  share link plus the packed data); once it is added to `games/`, everyone who
  opens the site can play it.

  That is the honest ceiling of static hosting: publishing goes through a human
  step, and reading is instant and global. Anything more — instant uploads,
  accounts, comments — needs a server, and nothing in this project pretends
  otherwise.
- Three games to start the gallery: **Coin Quest**, **Maze Runner** and
  **Just Ask For It**.

## 0.5.0 — Many walls, doors, and a much faster screen

### Fixed
- **A second collision replaced the first instead of adding to it.** Movement
  behaviours stored one wall sprite, so `horizontal(1, 2)` followed by
  `horizontal(1, 5)` left only sprite 5 solid. Walls are a list now.
- **Rooms full of blocks ran slowly.** Drawing a 16×16 sprite meant 256
  `fillRect` calls, so a full room cost 76,800 of them every frame. Sprites are
  now painted once onto their own canvas, and the tile map is painted once and
  reused until a tile, the room or the artwork actually changes. A completely
  full room went from **24 fps to a steady 60**, and the drawing step from
  **39 ms per frame to about 0.01 ms**.

### Added
- `solid(2)` / `wall(2)` — marks a sprite solid for everything that moves.
  Call it once per wall sprite; there is no limit.
- `horizontal(1, 2, 5)`, `vertical(1, 2, 5)`, `gravity(1, 2, 5)` and
  `bounce(1, 2, 5)` accept any number of walls. Speed now comes from
  `playerspeed()` rather than a third argument.
- `door(5)` — touching sprite 5 moves to the next room; `door(5, 3)` goes to
  room 3 exactly. `nextroom()` and `next_room()` are the same command. A door is
  never solid, or there would be no way to walk into it — and if you declare it
  both, AI mode says so rather than leaving you with a door that does nothing.

### AI mode
- Reads a **list of walls in one sentence**: "sprite 1 has collision with
  sprite 2 and sprite 5" now marks both, where before the "and" split it into
  separate wishes and the second was lost.
- Understands **doors and exits**: "sprite 5 is a door to the next room",
  "sprite 7 is an exit to room 3".
- **Survives typos** one letter out — *colision*, *gravty*, *platfomer*.
- Follows **"it"** back to the sprite you last named: "sprite 4 kills me. it
  chases me too".
- **Takes things back**: "no gravity", "remove the title screen", "without lives".
- **Difficulty**: "make it hard" speeds up chasers and cuts you to one life;
  "make it easy" does the opposite.
- Answers **"hi"** and **"help"** instead of reporting them as gibberish.
- Ends every run with a **one-line summary** of the game it built.

## 0.4.1 — A smarter AI mode

### Added
- **Collision.** `make sprite 1 have collision with sprite 2` now works, along
  with "can't walk through", "cannot pass through", "bumps into", "is blocked
  by", "stands on", and `sprite 2 blocks sprite 1` — which names the pair the
  other way round and is read accordingly. If the description gives the player
  no way to move, arrow-key movement is added too, since collision with nothing
  to bump into does nothing.
- **A normalising pass** runs before any rule: contractions are opened out and
  near-synonyms folded together, so *gold*, *gems*, *fruit* and *treasure* all
  reach `coin`, *baddie* and *monster* reach enemy, *my guy* and *hero* reach
  player, and *hp* reaches lives.
- Two more wishes: `put sprite 3 at 100 50` and `hide sprite 5`.
- **Suggestions.** A line it can't place now comes back with the closest
  phrasing it does know: *did you mean something like: sprite 3 is a coin*.

### Fixed
- `bind left to the A key` bound the T of "the" instead of A.
- `make left be "Q"` was read as text to print on screen rather than a binding.

## 0.4.0 — AI mode, sharing, and jobs for sprites

### Added
- **AI mode.** Write what you want in plain English, one wish per line. Run
  turns it into a real Easy-mode program, lists every single thing it
  understood, and names any line it couldn't. **Show me the code** then drops
  the finished program into Easy mode so you can take it over.

  It is a hand-written intent parser — about twenty rules that look for words
  like *coin*, *gravity*, *lives* or *chases* and pull out the sprite numbers.
  Nothing leaves the browser, no API key, no cost, works on GitHub Pages, and
  the same description always compiles to the same program. It only knows the
  vocabulary in the Help tab, and it says so when a line falls outside it
  rather than ignoring it quietly.
- **Easy mode runs every Normal program**, so picking Easy costs you nothing.
- **Jobs you can give a sprite** (Easy):
  - `coin(3)` — vanishes when the player touches it, adds 1 to `coins`.
    Works as a sprite and as any room tile painted with it.
  - `death(4)` — costs a life and sends you back to the start; without
    `lives()` the game simply restarts.
  - `spring(5)` / `boing(5)` — flings the player upwards.
  - `lives(3)` / `lifes(3)` — a life count, drawn in the corner. Leave it out
    for infinite lives.
  - `bounce(1, 2)` — sprite 1 flies about and bounces off sprite 2 and the
    screen edges, like a pong ball.
  - `chase(1, 2)` — sprite 1 walks straight at sprite 2.
  - `smartchase(1, 2, 3)` — a platformer chaser: it falls, and jumps over
    walls and pits, with sprite 3 as the ground.
  - `playerspeed(4)` / `player_speed(4)`, and `player(1)` when the engine's
    guess about who the player is needs correcting.
- **`reset if`**, one-liner or block form — starts the game over when true.
- **Fourth-wall commands:** `closegame()` / `close_game()`,
  `importgame("My Other Game")` / `import_game()`, and
  `changegame("My Other Game")` / `change_game()`, which hands the running
  game over to another one — its sprites, rooms and code all take over.
- **`bind("left", "A")`** remaps any key to any other.
- **PNG import** (🖼 in the Paint tab). Colours snap to the nearest of the
  sixteen in the palette. If the image is bigger than 16×16 a menu asks
  whether to squash it into one sprite or spread it across a grid of sprites.
- **My Games** (📚): a library kept in this browser, searchable by name or
  author. Share a game as a link that carries the entire game inside the URL,
  or as a `.simple` file. Each game has its own author name, or none.
- The stage now reports how many sprites and room tiles a project holds.

### Changed
- Templates now say in a comment which parts of what you see come from the
  Rooms tab rather than from code.
- Two new templates: **Just Ask For It** (AI) and **Coin Quest** (Easy).

### A note on "online"
Sharing is by link and by file. There is no upload, no accounts and no global
search across other people's games, because all of that needs a server and
this is one HTML file with nothing behind it. A link is genuinely enough to
send a whole game to anyone, and it is honest about where the game lives.

## 0.3.0 — Simple++

The engine got a name, three difficulty modes, and a title screen system.

### Added
- **Renamed to Simple++.** Old saved projects still load.
- **Difficulty modes**, picked at the top of the window and saved with the project:
  - **Easy** — everything from Normal, plus one-line commands that do the hard
    parts for you: `gravity()`, `horizontal()`, `vertical()`, `jump()`, `animate()`.
  - **Normal** — the language as it was.
  - **Hard** — plain JavaScript with the engine exposed as an `S` API, plus
    `onStart()`, `onFrame()` and `onKey()`. Real loops, arrays, functions.
- **Easy mode commands**
  - `gravity(1, 2)` — sprite 1 falls; sprite 2 is solid ground, both as a sprite
    and as any room tile painted with it. `gravity(1)` alone falls to the floor.
  - `horizontal(1, 2)` — smooth left/right movement with acceleration and
    friction, blocked by sprite 2. `horizontal(1)` alone ignores walls.
  - `vertical(1, 2)` — the same, up and down.
  - `jump(1, 8)` — jumps, but only when standing on something.
  - `animate(1, "1, 2, 3, 2")` — sprite 1 cycles through that list forever.
- **Title screens** (Easy and Normal)
  - `title("Game")`, also spelled `titlescreen()` or `title_screen()` — freezes
    the program and shows a big title with a Play button.
  - `titleoption("Options")` / `title_option("Options")` — adds another button.
    Buttons are found anywhere in the program, so order doesn't matter.
  - `if clickbutton("Options")` / `click_button("Options")` — true on the frame
    that button is clicked. Naming a button that doesn't exist stops the program
    with an error saying so.
- **Lobby** (👥 button) — code-based two-player, across two browser tabs on one
  computer. Create a lobby, copy the five-letter code, join from the other tab.
  In code: `share(1)` broadcasts a sprite, `me()` is 1 or 2, `players()` counts
  who's connected, `mate(1, x)` reads the other player's sprite.
  Over the internet this would need a server, which a single HTML file has no
  way to provide — so this is the local version rather than a fake one.
- **Changelog**, in `CHANGELOG.md` and in the app.
- Two templates: **Jump About** (Easy platformer) and **Tag** (two players).

### Changed
- The Help tab and the Learn steps now show the commands for the mode you're in.
- Switching mode offers to load that mode's starter program; sprites and rooms
  are always kept.

## 0.2.0 — Templates and lessons

### Added
- **Template gallery** (✦ button, and shown on a first visit): six complete
  projects — Catch the Star, Pong, Maze Runner, Space Dodge, Coin Grid and an
  empty sandbox — each ending in a `# TRY THIS` list of next changes to make.
- **Learn tab**: ten steps from "put something on screen" to walls and repeat
  blocks, each with a **Try it ▶** button that loads and runs the code.
- `sound(1..6)` — beeps.
- `tile(x, y)` — which sprite is painted at a spot.
- `settile(x, y, n)` — change a tile while the game runs.
- `free(n, dx, dy)` — true when a sprite can move there without hitting a tile.

### Fixed
- Running a game no longer edits the rooms you drew: games work on a copy.
- `key(space)` treated the key's name as an undefined variable.

## 0.1.0 — First version

### Added
- Sprites are numbers. Unlimited sprites, 16×16, sixteen colours.
- Paint tab: click and drag to draw, right-drag to erase.
- Rooms tab: stamp sprites as tiles onto a 20×15 grid, unlimited rooms.
- The language: `show`, `hide`, `move`, `put`, `print`, `room`, `set`, `add`,
  `wait`, `stop`, with `when start`, `every frame`, `when key`, `repeat` and
  `if` blocks, and `x()`, `y()`, `touching()`, `random()`.
- Errors report the line number and say what went wrong in plain words.
- Projects auto-save to the browser and export/import as JSON.
