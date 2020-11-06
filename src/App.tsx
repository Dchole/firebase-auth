import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/login";
import Register from "./components/login";
import UserContextProvider from "./UserContext";

const App = () => (
  <UserContextProvider>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </UserContextProvider>
);

export default App;
