import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";

const ForgotPassword = () => {
  const { replace } = useHistory();
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSearching(true);

      const auth = firebase.auth();
      const methods = await auth.fetchSignInMethodsForEmail(email);

      if (!Boolean(methods.length)) {
        replace("/register");
        throw new Error("You don't have an account! Please Sign Up");
      }

      methods.includes("password")
        ? auth.sendPasswordResetEmail(email, {
            url: `${window.location.origin}/login`
          })
        : alert(`You previously signed in with ${methods[0]}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    } finally {
      setSearching(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Forgot Password</legend>
          <label>
            Email
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </label>
        </fieldset>
        <button type="submit">
          {searching ? "Searching..." : "Search Account"}
        </button>
      </form>
    </main>
  );
};

export default ForgotPassword;
