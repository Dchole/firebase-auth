import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import Providers from "../components/providers";

const Register = () => {
  const { replace } = useHistory();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);

      replace("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Providers>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Account details</legend>
          <label>
            Email
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleInputChange}
            />
          </label>
        </fieldset>
        <button type="submit">{loading ? "Loading..." : "Sign in"}</button>
        <div id="links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </Providers>
  );
};

export default Register;
