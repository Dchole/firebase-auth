import "./App.css";
import React from "react";
import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./utils/firebase-config";

firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
});

const App = () => (
  <main>
    {/* The surrounding HTML is left untouched by FirebaseUI.
  Your app may use that space for branding, controls and other customizations. */}
    <h1>Welcome to My Awesome App</h1>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </main>
);

export default App;
