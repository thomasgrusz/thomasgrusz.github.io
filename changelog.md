# Change Log

### Date: 2023 November 12

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
