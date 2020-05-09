import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ProtectedRoute } from "./protectedRoutes";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser } from "./redux/actions/userActions";
//Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Socios from "./pages/socios";
import Configuracion from "./pages/configuracion";
import Informes from "./pages/informes";
import Productos from "./pages/productos";
import Usuario from "./components/usuario";

import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6abf69",
      main: "#388e3c",
      dark: "#00600f",
      contrastText: "#000000",
    },
    secondary: {
      light: "#d05ce3",
      main: "#9c27b0",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const token = localStorage.user;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
  }
}

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className={classes.root}>
          <CssBaseline />
          <Router>
            <Sidebar />
            <Navbar />
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/socios" component={Socios} />
              <ProtectedRoute exact path="/productos" component={Productos} />
              <ProtectedRoute exact path="/informes" component={Informes} />
              <ProtectedRoute
                exact
                path="/configuracion"
                component={Configuracion}
              />
              <ProtectedRoute exact path="/usuario" component={Usuario} />
            </Switch>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
