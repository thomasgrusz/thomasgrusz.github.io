# Change Log

Main reason for this rewrite is to include a bundler called `Parcel` and further automate the build process. This helps in particular with customizing and size reduction of the `Bootstrap`css library and adding backwards browser compatibility. Further the downloadable CV is build directly from source, i.e. the `content.json` file.

## Date: 2023 November 12-16

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

installs

- import bootstrap `.scss` files for sass/css customization from bootstrap-parcel boilerplate file
- import favicons into `src/assets/favicons`
- install popperjs for bootstrap animation: `npm i @popperjs/core`
- install icons for social media & email in footer: `npm i bootstrap-icons`

content

- Shorten certain keys in `content.json` where sensible

html

- create boilerplate `src/index.html` file and link `main.scss` and `main.js`
- hook up favicons
- build `index.html` skeleton with PLACEHOLDERTEXT
- finish sections 'languageSelector', 'header', 'about' and 'footer'

scss

- rename `src/scss/abstracts/_variables` to `src/scss/custom/_my-variables`
- comment out all custom sass variables and custom theme code
- add custom styles in `_my-variables`

js

- refactor code for language buttons and html content population into separate es6 modules:

```
.
`-- src
    `-- js
        `-- hookUpLanguageButtons.js
        `-- main.js
        `-- populateHTML.js
```
