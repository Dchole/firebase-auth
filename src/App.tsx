import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import UserContextProvider from "./UserContext";

const App = () => (
  <UserContextProvider>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
    </Switch>
  </UserContextProvider>
);

export default App;
