import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ProtectedRoute } from "./protectedRoutes";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
//Components
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Socios from "./pages/socios";
import Colaboradores from "./pages/colaboradores";
import Configuracion from "./pages/configuracion";
import Informes from "./pages/informes";
import Comida from "./pages/comida";
import Geneticas from "./pages/geneticas";
import Usuario from "./components/usuario";

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6abf69",
      main: "#388e3c",
      dark: "#00600f",
      contrastText: "#000000"
    },
    secondary: {
      light: "#d05ce3",
      main: "#9c27b0",
      dark: "#6a0080",
      contrastText: "#ffffff"
    }
  }
});
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

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
            <Login />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/socios" component={Socios} />
              <ProtectedRoute exact path="/geneticas" component={Geneticas} />
              <ProtectedRoute exact path="/comida" component={Comida} />
              <ProtectedRoute
                exact
                path="/colaboradores"
                component={Colaboradores}
              />
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
