# Homepage of THOMAS GRUSZ

#### Live on: [https://thomasgrusz.com](https://thomasgrusz.com)

## Technologies used

- HTML 5
- CSS 3
- JavaScript ES6
- Bootstrap v5.3 (frontend framework)
- Parcel v2.10 (bundler)
- Puppeteer 21.5

## Project structure

The project consists of two parts.

- the website
- cv-maker

The website contains information about me, downloadable CVs in `PDF` format and some selected coding projects. The website's contents are injected dynamically via JavaScript during runtime. To make sure, that the downloadable CVs in `PDF` format and the CV section of the page are in sync, `cv-maker` recreates the PDFs from the same information source, that feeds the website.

All source files relating to the website are stored in the folders `src` and `static`. The text contents of the page are stored in `json` format and as mentioned above are dynamically injected during runtime.

**Change this file to update the CV contents:**

```
src/assets/content.json
```

The `dev` folder contains the compiled and bundled development site to work with. The minimized final production build is stored in the folder `docs`.

A more detailed description of the project is available in `changelog.md`.

## Update CV / page

Download the repo, cd into the project folder, install the dependencies and start the development server:

```
git clone https://github.com/thomasgrusz/thomasgrusz.github.io.git
cd thomasgrusz.github.io
npm i
npm run devStart
```

Open a browser and go to `localhost:1234`

Update the CV in `scr/assets/content.json` and instantly see the changes in the browser upon saving to disk. `Parcel` uses hot module loading to dynamically keep the page updated.

Sometimes the build pipeline during development fails, particularly when switching `git` branches, as `.parcel-cache` is not tracked by `git`. If this happens, simply delete both, the `.parcel-cache` and `dev` folders before running `npm run devStart` again.

After updating the CV, run the build command:

```
npm run build
```

This will create a bundle of static files in the `docs` folder ready for deployment.

## Publishing on GitHub

GitHub offers an automatic publishing service, called [`gh-pages`](https://docs.github.com/en/pages/getting-started-with-github-pages). It allows to publish either the root `/` or `docs` folder of a branch. As the parcel build is stored in a `docs` folder, the site will automatically be published on `gh-pages` upon pushing the code to this GitHub repo.
