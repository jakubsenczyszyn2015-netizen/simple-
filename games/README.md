# The gallery

Every game in here shows up in the **🌍 Gallery** tab inside Simple++, for
everybody who opens the site.

There is no database. GitHub Pages serves files and nothing else, so the
gallery *is* a file: `index.json` lists the games, and each game is a
`.simple` file next to it. The app fetches them at runtime.

## Adding your game

1. In Simple++, open **📚 My Games**, type a name and an author (or leave the
   author blank to stay anonymous).
2. Press **🌍 Publish to gallery**. A GitHub issue opens, already filled in
   with your whole game.
3. Post it. Once it's added here, everyone who opens the site can play it.

## Adding one by hand (maintainers)

Save the game's JSON as `games/your-game.simple`, then add an entry to
`index.json`:

```json
{
  "name": "Your Game",
  "author": "you, or leave it out",
  "file": "your-game.simple",
  "mode": "easy",
  "about": "One sentence about it."
}
```

`mode` is one of `easy`, `normal`, `hard` or `ai`. Nothing else is needed —
the `.simple` file already carries the sprites, the rooms and the code.
