# Changelog

All notable changes to Simple++ live here, newest first.
The same list is readable inside the app under the **≡ Changelog** tab.

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
