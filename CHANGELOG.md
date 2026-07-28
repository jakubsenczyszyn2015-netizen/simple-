# Changelog

All notable changes to Simple++ live here, newest first.
The same list is readable inside the app under the **≡ Changelog** tab.

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
