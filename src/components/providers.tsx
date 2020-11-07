import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const Providers: React.FC = ({ children }) => {
  const { replace } = useHistory();

  const handleGoogleProvider = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      replace("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    }
  };

  return (
    <main id="auth">
      {children}
      <div id="divider">
        <hr />
        <span>OR</span>
        <hr />
      </div>
      <section>
        <button onClick={handleGoogleProvider}>Sign in with Google</button>
      </section>
    </main>
  );
};

export default Providers;
