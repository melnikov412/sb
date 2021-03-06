// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  buttons: ['video', 'channel', 'playlist'],  // search type selection buttons
  buttonActive: 'all',  // search in all fields (just name)
  lsKey: 'index'  // the name of the key to write to the local storage
};
