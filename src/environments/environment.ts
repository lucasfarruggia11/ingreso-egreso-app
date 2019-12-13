// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCZ8ihsY-kl3-tBZoMZa2v9qVcVEA0bz_0',
    authDomain: 'expense-manager-7187a.firebaseapp.com',
    databaseURL: 'https://expense-manager-7187a.firebaseio.com',
    projectId: 'expense-manager-7187a',
    storageBucket: 'expense-manager-7187a.appspot.com',
    messagingSenderId: '799705427199'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
