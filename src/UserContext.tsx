import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

interface IUserContext {
  user: firebase.User;
  userExists: boolean;
  handleLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

const UserContextProvider: React.FC = ({ children }) => {
  const { replace } = useHistory();
  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState({} as firebase.User);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setUserExists(true);
      } else {
        replace("/login");
        setUserExists(false);
      }
    });
  }, [replace]);

  const handleLogout = () => firebase.auth().signOut();

  return (
    <UserContext.Provider value={{ user, userExists, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
