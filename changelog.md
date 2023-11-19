# Change Log

Main reason for this rewrite is to include a bundler called `Parcel` and further automate the build process. This helps in particular with customizing and size reduction of the `Bootstrap`css library and adding backwards browser compatibility. Further the downloadable CV is build directly from source, i.e. the `content.json` file.

## Date: 2023 November 12-19

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

#### installs

- import bootstrap `.scss` files for sass/css customization from bootstrap-parcel boilerplate file
- import favicons into `src/assets/favicons`
- install popperjs for bootstrap animation: `npm i @popperjs/core`
- install icons for social media & email in footer: `npm i bootstrap-icons`

#### content

- Shorten certain keys in `content.json` where sensible

#### html

- create boilerplate `src/index.html` file and link `main.scss` and `main.js`
- hook up favicons
- build `index.html` skeleton with PLACEHOLDERTEXT
- finish sections 'languageSelector', 'header', 'about' and 'footer'

#### scss

- rename `src/scss/abstracts/_variables` to `src/scss/custom/_my-variables`
- comment out all custom sass variables and custom theme code
- add custom styles in `_my-variables`

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
