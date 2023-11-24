# Change Log

The main reason for this rewrite is to include a bundler called `Parcel` and further automate the build process. This helps in particular with customizing and size reduction of the `Bootstrap`css library and adding backwards browser compatibility. Further the downloadable CV is build directly from source, i.e. the `content.json` file.

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

One of the most important files is `content.js` and it has been copied into `src/assets/`. This file contains all the injectable content of the page in `json` format in two languages, English and German.

The artwork is stored in the `scr/assets/img` and `static` folders.

### Start rebuilding site

#### installs

- import bootstrap `.scss` files for sass/css customization from bootstrap-parcel boilerplate file
- import favicons into `src/assets/favicons`
- install popperjs for bootstrap animation: `npm i @popperjs/core`
- install icons for social media & email in footer: `npm i bootstrap-icons`

#### `package.json`

Define supported browser list and the scripts for running the development server and building the minimized production site:

```
"browserslist": "> 0.5%, last 2 versions, not dead",
"scripts": {
    "devStart": "parcel src/index.html --dist-dir dev",
    "build": "rm -rf build && parcel build src/index.html --no-source-maps --public-url / --dist-dir build"
}
```

To run the dev server run `npm run devStart` and to build the production site run `npm run build`. The development site is stored in the `dev` folder and the production site in the `build` folder.

#### content

- Shorten certain keys in `content.json` where sensible

#### html

- create boilerplate `src/index.html` file and link `main.scss` and `main.js`
- hook up favicons
- build `index.html` skeleton with PLACEHOLDERTEXT
- finish sections 'languageSelector', 'header', 'about', and 'footer'
- finish sections 'cv', 'selected coding projects' (before: 'featured work'), and 'certifications'
- use the` <picture>` elements instead of `<img>` to allow dynamic format loading (more details below)
- also use `parcel`s html image syntax to make `parcel`s image pipeline automatically create multiple formats of each source image for the build
- underlay `<header>` and `<footer>` elements with a background image

#### scss

- rename `src/scss/abstracts/_variables.scss` to `src/scss/custom/_my-variables.scss`
- delete all custom sass variables and custom theme code in `src/scss/custom/_my-variables`
- all bootstrap color shades to `_bootstrap-colors.scss` and import into `main.scss`
- add custom colors and themes in `_my-variables.scss` **(This is the file for defining the main site colors.)** and add it to `main.scss`
- add `_my-color-map.scss` to define new bootstrap themes based on the new color from `_my-variables.scss`
- finally define all custom sass/css in `_my-styles.scss`

#### js

- refactor code for language buttons and html content population into separate es6 modules:

```
.
`-- src
    `-- js
        `-- hookUpLanguageButtons.js
        `-- main.js
        `-- populateHTML.js
```

#### Static assets

Links to locally hosted assets, like PDFs, are injected via JavaScript **after** the `parcel` build process and that is why `parcel` fails to copy those assets into the final build folder. These assets have to be copied separately using the `parcel-reporter-static-files-cop` plugin. This plugin copies the contents of the `static` folder at the root of the project to the final build folder.

So the PDFs are placed in `homepage-thg/static/`, and a `.parcelrc` file with the following contents needs to be in place at the root:

```
{
  "extends": ["@parcel/config-default"],
  "reporters":  ["...", "parcel-reporter-static-files-copy"]
}
```

To install the plugin as a dev dependency run: `npm i -D parcel-reporter-static-files-copy`

Also make sure that the link to the PDFs inside the `content.json` file points to the root of the build folder, i.e.:

```
  .
  .
  .
 "cv_download_button": {
    "en": "Download CV",
    "de": "Lebenslauf herunterladen",
    "en_href": "./CV_Thomas_Grusz_en_2023_website.pdf",
    "de_href": "./CV_Thomas_Grusz_de_2023_website.pdf"
  },
  .
  .
  .
```

#### Images

`<picture>` elements are used to allow the browser to chose the appropriate image format.

```

            <picture>
              <source
                type="image/avif"
                srcset="
                  ./assets/img/thg_656x656.jpg?as=avif&width=400 2x,
                  ./assets/img/thg_656x656.jpg?as=avif&width=200
                "
              />
              <source
                type="image/webp"
                srcset="
                  ./assets/img/thg_656x656.jpg?as=webp&width=400 2x,
                  ./assets/img/thg_656x656.jpg?as=webp&width=200
                "
              />
              <source
                type="image/jpeg"
                srcset="
                  ./assets/img/thg_656x656.jpg?width=400 2x,
                  ./assets/img/thg_656x656.jpg?width=200
                "
              />
              <img
                class="img-fluid rounded-circle"
                src="./assets/img/thg_656x656.jpg?width=200"
                width="200"
                alt="Portrait of Thomas Grusz"
              />
            </picture>

```

The `<source>` elements offer the browser the following image formats in this order: `avif`, `webp`, `jpg` and in case the browser does not understand the `<picture>` element, there is an `<img>` element as fallback. The order is important, as `avif` is the most performant, but least distributed format, then `webp`, then `jpg`. Inside the `<source>` element, there is another ordered set of images to address device resolution within the `srcset` attribute. For instance many Apple devices have a 2x screen resolution.

## Date: 2023 November 21

### Merge `development` branch into master branch:

```
git switch master
git merge --allow-unrelated-histories development
==> resolve merge conflicts
git add .
git commit
```

As the development branch was started as an orphan branch, the `--allow-unrelated-histories` flag has to be used for merging.

### Publish on GitHub

In order to publish a folder on GitHub, the most simple solution is to create a new `production` branch, push it to GitHub and tell GitHub to deploy from that `production` branch.

```
git subtree split --prefix=build -b production
git switch build
git push --set-upstream origin production

```

## Date: 2023 November 23

### Add cv-maker

The cv-maker is a JavaScript program that ensures consistency of the CV section of the webpage and the downloadable CVs in PDF format. The program can be run separately via

```
npm run makeCv
```

This will read the content information relating to the CV from `src/assets/content.json` and produce two PDF files in the `static` folder:

```
static
|-- CV_Thomas_Grusz_de_2023.pdf
`-- CV_Thomas_Grusz_en_2023.pdf
```

`makeCv` is also part of the the two `npm` scripts `devStart` and `build`, i.e. the two PDFs during development and after build will always be up to date with the latest content.

```
cv-maker
|-- CV_Thomas_Grusz_de_2023.html
|-- CV_Thomas_Grusz_en_2023.html
|-- cv_template.html
|-- js_helper_functions
|   |-- generatePDF.js
|   `-- injectContent.js
|-- main.js
|-- styles.css
`-- thg_150x150.jpg
```

`cv-maker` is a folder in project root with an entry point of `main.js`.

`main.js` reads the relevant content from `src/assets/content.json`, injects it into the `cv_template.html` and stores the English and German versions of the CV as intermediate `html` files. Then, these `html` files will be transformed into PDFs using the `puppeteer` package.

The CVs are styled based on the local `styles.css` file and a smaller (150x150) version of the portrait photo.

## Date: 2023 November 24

### Deployment on GitHub and corresponding changes to the build process

After consulting the GitHub documentation on [publishing a site on gh-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#publishing-sources-for-github-pages-sites), it became clear, that the easiest way to deploy a page, is to move the final static files from the `build` folder to the `docs` folder. gh-pages can be instructed to publish from any branch either from the root folder or from the `docs` folder. As this project is using parcel as the build tool, it makes sense to have the result of the build process being stored and then deployed directly from the `docs` folder. This way, there is no need to have a `production` branch.

The `build` script in `package.json` has been adapted accordingly:

```
"build": "npm run makeCv && parcel build src/index.html --no-source-maps --public-url / --dist-dir docs",
```
