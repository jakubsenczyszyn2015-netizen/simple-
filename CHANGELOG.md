# Changelog

All notable changes to Simple++ live here, newest first.
The same list is readable inside the app under the **≡ Changelog** tab.

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
