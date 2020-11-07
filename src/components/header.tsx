import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/register">Sign up</Link>
      <Link to="/login">Sign in</Link>
    </header>
  );
};

export default Header;
