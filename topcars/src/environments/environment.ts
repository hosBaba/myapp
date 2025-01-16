// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebaseConfig : {
    apiKey: "AIzaSyAWb2ITybvsqQreBHIy4_DzBVx4CCk3xGQ",
    authDomain: "mycars-4e11d.firebaseapp.com",
    projectId: "mycars-4e11d",
    storageBucket: "mycars-4e11d.appspot.com",
    messagingSenderId: "10054745160",
    appId: "1:10054745160:web:d3813fe197742aec31ac7d",
    measurementId: "G-C76WKR8K12"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
