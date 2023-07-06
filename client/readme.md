### Client

### Dependencies

`"ethers": "^5.7.2"`
`npm i "ethers@^5.0.0" --legacy-peer-deps`

`npm i framer-motion autoprefixer @tailwindcss/forms eth-revert-reason`


### Unknown at rule @tailwind

Install VS Code extension Tailwind CSS IntelliSense. Edit .vscode/settings.json in your project folder (or in your user settings), and added 

"files.associations": { "*.css": "tailwindcss" }

`https://github.com/tailwindlabs/tailwindcss/issues/325`


### PropTypes

`https://legacy.reactjs.org/docs/typechecking-with-proptypes.html#proptypes`

`optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol, `


### Global not defined error fix

`https://dev.to/richardbray/how-to-fix-the-referenceerror-global-is-not-defined-error-in-sveltekitvite-2i49`


### Vite - Env Variables and Modes

`https://vitejs.dev/guide/env-and-mode.html`


### Fix already pushed .env file to github

Untrack this file from git by executing the below command, Create .env again if deleted, add to .gitignore file. Commit changes again and push code.

`git rm -r --cached ./PATH_NAME/.env`

`https://stackoverflow.com/questions/30696930/how-to-hide-env-file-from-github`

`https://stackoverflow.com/questions/1274057/how-do-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore`


### Note:
Credit for initial tutorial and support: JavaScript Mastery.
`https://www.youtube.com/watch?v=Wn_Kb3MR_cU`