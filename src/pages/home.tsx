import React, { useContext } from "react";
import Header from "../components/header";
import { UserContext } from "../UserContext";

const Home = () => {
  const { user, userExists, handleLogout } = useContext(UserContext);

  if (!userExists) {
    return (
      <>
        <Header />
        <main>
          <h1>You're not logged in</h1>
        </main>
      </>
    );
  }

  return (
    <main>
      <h1>Welcome, {user.displayName}.</h1>
      <img src={user.photoURL || ""} alt={user.displayName || ""} />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
};

export default Home;
