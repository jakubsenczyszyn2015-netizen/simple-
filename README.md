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
  eyedropper tools, flip buttons, a colour wheel for adding your own colours, and a slider for
  how big the drawing area is. Sprites are 16×16 by default and can be set to 8,
  24, 32, 48 or 64 — the room grid adjusts to match. Unlimited sprites, numbered
  1, 2, 3, and up.
- **Frames** — a sprite can hold more than one picture. **+ Frame**, **⧉ Copy**,
  **🗑 Delete** and **▶ Preview** sit under the drawing; `play(1, 6)` flips
  through them in the game. Not the same as `animate()`, which flips between
  different sprite *numbers* — this keeps a walking player as sprite 1.
- **Names** — give a sprite a name in the Paint tab and it works anywhere the
  number does: `show("player")` is `show(1)`.
- **Rooms** — stamp any sprite onto a tile grid with pencil, fill, line, square
  and circle tools. A room is either one screen or **endless**, for open worlds
  you explore with `camera(1)`. Unlimited rooms, shown from code with `room(2)`.
- **Music** — songs numbered like sprites. Click notes onto a grid (a five-note
  scale, so nothing sounds wrong), pick a speed and a sound, or import an mp3 or
  wav. `music(1)` plays one; `title("My Game", 2)` plays one behind the title.
- **SFX** — short noises built from seven sliders (pitch, slide, length,
  loudness, roughness, wobble, repeats), with the waveform drawn above them so
  you can see what each one does. Ten presets — Jump, Coin, Hit, Laser,
  Explode, Power up, Blip, Step, Alarm, Splash — plus 🎤 recording your own
  voice or importing a wav/mp3. `sfx(1)` or `sfx("jump")` plays one.
- **Help** — every command, with a search box that looks through all four modes
  and tells you which one each answer belongs to. Press **/** to jump to it.
- **Learn** — short steps, each with a button that loads and runs the code.
- **Templates** — ten complete games to open, run and take apart.
- **Changelog** — see [CHANGELOG.md](CHANGELOG.md).

The **⋯** button at the top right holds everything else: five **themes** for
the editor (Classic, Modern, Retro, Futuristic, Video game), the touch
controls, Export, My Games, and Save/Load. A theme changes the editor and
never the game, so what you make looks the same to everyone who plays it.

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
vehicle(1, 2)          press E to ride sprite 2; E again to get off
ending("You win!")     freeze, fade to black, show the words
collision(1, 3)        sprite 1 cannot walk into sprite 3 (any mode)
touchinginroom(1, 3)   touching a tile painted into the room?
pause()  resume()      stop and start; P toggles it too
roomhide(12, 3)        every sprite-12 tile acts like a 3; roomshow(12) undoes it
```

`if ... else ... end` and `else if` work in Normal mode and up.

`after start ... end` runs once after `when start` has finished and the first
frame is drawn. You can write several `when start` blocks; they all run.

`every frame unless <condition> ... end` pauses itself while the condition is
true and carries on when it stops.

## Phones and tablets

**📱 Touch** draws a d-pad and Z / X / C / SPACE over the stage. They press the
same keys the keyboard does, so a game written for arrows and `when key z`
already works on a phone with nothing extra to write. It turns itself on when
the browser reports a touch screen, remembers the choice, and exported games
carry the buttons with them.

Everything runs on **iOS 12.5** and up — no `?.`, no `??`, no `matchAll`
anywhere in the file, and the audio context unlocks on the first tap the way
iOS insists. `smoke-test.mjs` fails the build if any of that creeps back in.

## Exporting

The **⬆ Export** tab has four things in it:

- **Web page (.html)** — one file with the whole game inside. Double-click and
  it plays, anywhere, offline, with the touch buttons already on.
- **Project file (.json)** — everything the editor knows. Open it with Load.
- **Desktop kit** — a zip holding a ready-made Electron project: `game.html`,
  `main.js`, `package.json` and a `BUILD.txt`. Unzip, `npm install`,
  `npm run dist`, and you have a Windows `.exe`, a Mac `.dmg` or a Linux
  AppImage.
- **Phone kit** — a zip holding a ready-made Capacitor project for the Play
  Store (`.apk`) and the App Store (`.ipa`).

A browser tab cannot compile a program — an `.exe` needs a linker, an `.apk`
needs the Android SDK, an `.ipa` needs a Mac and Apple's signature. No engine
does it from inside a browser; Godot, Unity and GameMaker all run a compiler on
your machine. So the kits hand you the exact project those compilers expect,
with the commands written out.

Xbox and PlayStation need a registered developer account and a devkit machine
you apply for before either company will run anything, so nobody can hand those
out — but the desktop kit is what such a port starts from.

On a phone, "add to home screen" gets you an icon that opens straight into the
game with none of the above.

## Sprites you don't have to draw

**📦 Pre-made** has four packs, all drawn for Simple++ and free to use in
anything you make: every sprite the templates use, plus platformer, space and
dungeon sets. Take one or take the whole pack.

**⬇ PNG** saves a sprite as a picture, or every sprite as one sheet.

The 🖼 button in the Paint tab imports an image. With **Limited colours** ticked
the colours snap to the nearest in the palette; untick it and the picture keeps
its own, which get added to the palette. Anything larger than 16×16 asks whether to squash it
into one sprite or spread it across a grid of sprites.

## My Games

📚 **My Games** is a library kept in this browser. Give a game a name and an
author, save it, and open it again whenever you like — searchable by either.

To give a game to somebody else, use **⬆ Export**: it writes a single `.html`
file that plays anywhere, with no editor around it and nothing to install.

## Putting it online

The whole thing is one file, so any static host works.

- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main` → `/root`.
- **Cloudflare Pages:** connect the repository, leave the build command empty
  and the output directory as `/`. If anything behaves oddly there, turn
  **Rocket Loader** off in Speed → Optimization — it rearranges inline scripts,
  which this page is built from.

**Games do not follow you between addresses.** A browser keeps saved games
under the exact address of the site, so moving from one host to another starts
with an empty library while the old games stay safe at the old address. Open the
old site, press **⬇ Backup all** in My Games, then **⬆ Restore** on the new one.

## Breaking the fourth wall

```
closegame()
importgame("My Other Game")     pull in a game from My Games
changegame("My Other Game")     become it — sprites, rooms and code
```

## Title screens

```
title("My Game")              big title, Play button, program waits here
title("My Game", 2)           ...with song 2 playing behind it
titleoption("Options")        adds another button
if clickbutton("Options")     true on the frame it's clicked

fancytitle("Go!")             drops in and bounces
fanciertitle("Go!")           drops in spinning, settles facing you
fanciesttitle("Go!", 1)       sprite 1 glides in, leaps away, white flash,
                              then the spinning title
scrolltitle("Go!", 2)         sprite 2 drifting diagonally behind the title
customtitle("Go!", 1, 4, 5, 3)  your own sequence of numbered pieces
titletile(2)                  a scrolling background behind any of them
titlesprite(3)                which sprite the flying ones use
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
