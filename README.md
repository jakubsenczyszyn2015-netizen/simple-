# Simple++

A tiny text-based game engine for beginners, in one HTML file. Open `index.html`
in a browser — there is nothing to install and nothing to build.

**Every sprite is a number.** You draw sprite 1, then you write `show(1)`.

```
show(1)
move(1, 10, 0)
print("Hello World!", 0, 0)
hide(1)
```

## What's in it

- **Code** — write the game, watch it run on a 320×240 screen, get errors in
  plain words with the line number. **⛶ Fullscreen** (or the **F** key) blows
  the stage up to fill the monitor, scaled by a whole number so the pixels stay
  sharp; Escape comes back.
- **Paint** — a pixel editor with pencil, eraser, fill, line, box, circle and
  eyedropper tools, a colour wheel for adding your own colours, and a slider for
  how big the drawing area is. Sprites are 16×16 by default and can be set to 8,
  24, 32, 48 or 64 — the room grid adjusts to match. Unlimited sprites, numbered
  1, 2, 3, and up.
- **Rooms** — stamp any sprite onto a 20×15 tile grid with the mouse.
  Unlimited rooms, shown from code with `room(2)`.
- **Learn** — short steps, each with a button that loads and runs the code.
- **Templates** — ten complete games to open, run and take apart.
- **Changelog** — see [CHANGELOG.md](CHANGELOG.md).

## Four modes

Pick one at the top of the window; it's saved with your project.

**Easy** — everything Normal has, plus commands that do the hard parts:

```
gravity(1, 2)              sprite 1 falls, sprite 2 is the ground
horizontal(1, 2)           arrow keys move sprite 1, sprite 2 blocks it
vertical(1, 2)             the same, up and down
jump(1, 8)                 only works when standing on something
animate(1, "1, 2, 3, 2")   flip through those sprites forever
```

**Normal** — the Simple++ language: `show`, `hide`, `move`, `put`, `print`,
`room`, `set`, `add`, `wait`, `sound`, `stop`, with `when start`, `every frame`,
`when key`, `repeat` and `if` blocks, and `x()`, `y()`, `touching()`, `free()`,
`tile()`, `random()`.

**AI** — type what you want in plain English, one wish per line:

```
I want a platformer
Sprite 1 is the player and sprite 2 is the ground
Make sprite 1 have collision with sprite 2 and sprite 5
Sprite 5 is a door to the next room
Give me 3 lives
Sprite 3 is a coin
Restart if I fall off the bottom
A title screen called Coin Rush
```

Run writes the Easy-mode program, lists everything it understood, and names any
line it couldn't. **Show me the code** hands you the finished program in Easy
mode to carry on with. It is a hand-written intent parser, not a chatbot — it
runs offline with no API key, always gives the same answer, and when a line
falls outside its vocabulary it says so and suggests the nearest phrasing it
does know. It reads round the wording: "can't walk through", "bumps into" and
"is blocked by" all mean collision, and *gold*, *gems* and *treasure* all mean
coin.

**Hard** — plain JavaScript. The engine arrives as `S`, and you register
`onStart()`, `onFrame()` and `onKey()` callbacks:

```js
onFrame(() => {
  const me = S.sprite(1);
  if (S.keys.left) me.x -= 3;
  S.print(`x is ${me.x}`, 6, 6);
});
```

### More Easy blocks

```
playerspeed(4)         how fast the player moves
coin(3)                vanishes when touched, adds 1 to `coins`
death(4)               costs a life, or restarts if you have none
spring(5)              flings the player upwards
lives(3)               a life counter in the corner
bounce(1, 2)           sprite 1 flies about and bounces off sprite 2
chase(1, 2)            sprite 1 walks at sprite 2
smartchase(1, 2, 3)    a chaser that jumps pits and walls (3 is the ground)
reset if y(1) > 240    start over when that becomes true
solid(2)               sprite 2 is a wall for everything (call it per wall)
door(5)                touch it to go to the next room; door(5, 3) for room 3
bind("left", "A")      remap any key
camera(1)              the view follows sprite 1 (camx/camy for one axis)
resize(1, 10)          ten pixels bigger; size(1, 32) sets it outright
dialogue("Hi!")        a black box along the bottom with those words
3dplatformer(1, 2, 3)  experimental: your room, seen from the inside
addcoin(80, 60)        one coin there; only that one disappears
changeroomby(1)        go one room along; room_changed asks if it just did
fliphorizontal(1)      flip it over (flipvertical too)
fancytitle("Go!")      drops in and bounces; fanciertitle spins as it lands
exittitle()            leave the title screen from code (entertitle comes back)
speak("Hello")         says it out loud
button("Play", 10, 200)  a button; "when button("Play") clicked ... end"
whenclick(1)           true on the frame you click sprite 1
move("Hello!", 10, 0)  moves writing, not just sprites
chatbot("Hi!")         a dialogue box you can type answers into
fps(30)                how many times a second the game moves
```

`if ... else ... end` and `else if` work in Normal mode and up.

`after start ... end` runs once after `when start` has finished and the first
frame is drawn. You can write several `when start` blocks; they all run.

`every frame unless <condition> ... end` pauses itself while the condition is
true and carries on when it stops.

## Exporting

**⬆ Export** writes a single `.html` file containing the whole game with no
editor around it — double-click and it plays, anywhere, offline.

`.exe`, `.apk` and `.ipa` are compiled programs, and a web page cannot build
one; that needs a compiler and a signing key on your own machine. The exported
`.html` is exactly what the tools that *can* build them take as input: Electron
or Tauri for Windows, Capacitor for Android, and Capacitor plus a Mac and an
Apple developer account for iPhone. On a phone, "add to home screen" gets you an
icon that opens straight into the game without any of that.

## Sprites from PNGs

The 🖼 button in the Paint tab imports an image. With **Limited colours** ticked
the colours snap to the nearest in the palette; untick it and the picture keeps
its own, which get added to the palette. Anything larger than 16×16 asks whether to squash it
into one sprite or spread it across a grid of sprites.

## Sharing, My Games, and the gallery

📚 **My Games** is a library in your browser. Type a name and an author (or
leave the author blank to stay anonymous), then:

- **Save here** keeps it in this browser, searchable by name or author.
- **Share link** puts the entire game inside a URL — send it in a chat message
  and whoever opens it has your sprites, rooms and code.
- **Save .simple** writes the same thing as a file.

🌍 **Gallery** is one list of games that everybody sees: the ones in `games/`
plus every game posted as an issue. It keeps itself up to date while it's open.

### How that works without a database

GitHub Pages has no database. It serves files and nothing else. So the gallery
*is* a file: [`games/index.json`](games/index.json) lists the games, each one a
`.simple` file beside it, and the page fetches them when you open the tab.

**Publish to gallery** opens a GitHub issue already filled in with your whole
game — and that is the publishing step, because the gallery reads submitted
issues directly. It also lists anything in `games/`.

The list refreshes every five seconds while open. The network behind it is
asked about once a minute, because GitHub allows sixty calls an hour from one
address and a five-second poll would use that up in five minutes.
Reading is instant and global; publishing goes through a human step. That is
the honest ceiling of static hosting — instant uploads, accounts and comments
all need a server, and this project doesn't pretend to have one.

## Putting it on GitHub Pages

Settings → Pages → Deploy from a branch → `main` → `/root`. That's it; the site
is `index.html` and the `games/` folder next to it.

## Breaking the fourth wall

```
closegame()
importgame("My Other Game")     pull in a game from My Games
changegame("My Other Game")     become it — sprites, rooms and code
```

## Title screens

```
title("My Game")            big title, Play button, program waits here
titleoption("Options")      adds another button
if clickbutton("Options")   true on the frame it's clicked
```

## Two players

The **👥 Lobby** button makes a five-letter code. Open Simple++ in a second
browser tab, type the code in, and both tabs share a game: `share(1)` sends a
sprite to the other player, `me()` says whether you're player 1 or 2, and
`mate(1, x)` reads where their sprite is.

This works between tabs **on the same computer**. Playing with someone
elsewhere needs a server to relay between the two browsers, and a single HTML
file with nothing behind it can't provide one — so what's here is the real
local version rather than a pretend internet one.

## Saving

Projects auto-save in the browser. **Save** and **Load** export and import a
`.json` file with your sprites, rooms and code in it.
