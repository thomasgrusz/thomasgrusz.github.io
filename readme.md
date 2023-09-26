# Homepage Thomas Grusz

## Technologies used

- Bootstrap v5.3
- Gulp task runner v4.0.2

## Project structure and Gulp

Development files are located in the `src/` folder.
The minified files for production are located at root `/`.

Run

```
npm install
```

to install all development dependecies. Make sure that `npm` and `node.js` are installed on your system.

Run

```
npx gulp
```

to minify and copy `scr` files to root `/` for production.

If you have `gulp` installed _globally_ on your system, you can just run

```
gulp
```

instead of `npx gulp`.
