import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
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
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);

      await user?.sendEmailVerification();
      await user?.updateProfile({
        displayName: values.fullName
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log({ errorCode, errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Account details</legend>
          <label>
            Full Name
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </fieldset>
        <button type="submit">{loading ? "Loading..." : "Sign up"}</button>
        <div id="links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </form>
    </main>
  );
};

export default Register;
