import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //const isLoggedIn = useSelector(state => state.user.authenticated);
  const token = localStorage.getItem("user");
  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          dispatch({ type: SET_AUTHENTICATED });
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }
      }}
    />
  );
};
