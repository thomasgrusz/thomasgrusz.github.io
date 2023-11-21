# Homepage of THOMAS GRUSZ

#### Live on: [https://thomasgrusz.com](https://thomasgrusz.com)

## Technologies used

- HTML 5
- CSS 3
- JavaScript ES6
- Bootstrap v5.3 (frontend framework)
- Parcel v2.10 (bundler)

## Project structure

All source files are stored in the folders `src` and `static`. The text contents of the page are stored in `json` format and are dynamically injected during runtime.

**Change this file to update the CV contents:**

```
src/assets/content.json
```

The `dev` folder contains the compiled and bundled development site to work with. The minimized final production build is stored in the folder `build`.

A more detailed description of the project is available in `changelog.md`.

## Update CV / page

Download the repo, cd into the project folder, download the dependencies and start the development server:

```
npm i
npm run devStart
```

Open a browser and go to `localhost:1234`

Update the CV in `scr/assets/content.json` and instantly see the changes in the browser upon saving to disk. `Parcel` uses hot module loading to dynamically keep the page updated.

After updating the CV, run the build command:

```
npm run build
```

This will newly create a `build` folder containing the minimized, bundled project files ready for production deployment.
