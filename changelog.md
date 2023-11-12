# Change Log

## Date: 2023 November 12

### Set up development branch

Create a new 'orphaned' development branch, with no files except the `node_modules` folder and the `.vscode` folder containing the `settings.json` file.
Make an empty commit and add a `v0.1` tag.

```
git switch --orphan development
git commit --allow-empty -m "Initial commit message"
git tag -a v0.1 -m "message"
```

Then add the `node_modules` folder to `.gitignore` and track and commit the following files:

- `.vscode/settings.json`
- `.gitignore`
- `changelog.md`

```
git add .
git commit -m "chore: add utility files"
```

### Set up `parcel/bootstrap` project

```
rm -rf node_modules
npm init -y
npm i -D parcel
npm i bootstrap


mkdir -p src/{assets/{img/,pdf/},scss/,js/}
touch src/{scss/main.scss, js/main.js}
.
`-- src
    |-- assets
    |   |-- contents.json
    |   |-- img
    |   `-- pdf
    |-- scss
    |   `-- main.scss
    `-- js
        `-- main.js
```

One of the most important files is `content.js` and it has been copied into `src/assets/`. This file contains all the content of the page in `json` format in two languages, English and German.

The `img` and `pdf` folders have populated with the necessary artwork.

### Start rebuilding site

Shorten certain keys in `content.json` where sensible.
