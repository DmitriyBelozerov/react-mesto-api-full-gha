import React from "react";
import { Route, Redirect } from "react-router-dom";
import { TranslationLogIn } from "../contexts/CurrentUserContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const loggedIn = React.useContext(TranslationLogIn);

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute; 