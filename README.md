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
  plain words with the line number.
- **Paint** — a 16×16 pixel editor with sixteen colours. Unlimited sprites,
  numbered 1, 2, 3, and up.
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
Give me 3 lives
Sprite 3 is a coin
Restart if I fall off the bottom
A title screen called Coin Rush
```

Run writes the Easy-mode program, lists everything it understood, and names any
line it couldn't. **Show me the code** hands you the finished program in Easy
mode to carry on with. It is a hand-written intent parser, not a chatbot — it
runs offline with no API key, always gives the same answer, and says so when a
line falls outside its vocabulary instead of ignoring it.

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
bind("left", "A")      remap any key
```

## Sprites from PNGs

The 🖼 button in the Paint tab imports an image. Colours snap to the nearest of
the sixteen in the palette. Anything larger than 16×16 asks whether to squash it
into one sprite or spread it across a grid of sprites.

## Sharing and My Games

📚 **My Games** keeps a searchable library in your browser — search by name or
author, and give each game its own author name or leave it anonymous.

- **Share link** puts the entire game inside a URL. Send it in a chat message
  and whoever opens it has your sprites, rooms and code.
- **.simple file** does the same as a file.

There is no upload and no global directory of everyone's games: that needs a
server, and this is one HTML file with nothing behind it. A link does the job
honestly instead.

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
