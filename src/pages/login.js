//mirar eror cuando pongo contraseña incorrecta
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
//Redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { loginUser } from "../redux/actions/userActions";
import { SET_AUTHENTICATED } from "../redux/types";

import "./styles/login.css";

const validator = require("email-validator");

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const boldText = {
  fontWeight: "900 ",
  color: "green",
};
const centerItem = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  textAlign: "center",
};

export default function Login(props) {
  let history = useHistory();

  const classes = useStyles();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  let { email, password, emailError, passwordError } = state;

  // let emailInput = document.getElementById("email");
  // let passwordInput = document.getElementById("password");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: SET_AUTHENTICATED });
    }
  }, []);

  const validateEmail = () => {
    console.log(email);
    if (!email) {
      console.log("true");
      emailError = "¡Introzca el email!";
    } else if (!validator.validate(email)) {
      emailError = "¡Email incorrecto!";
    }
    if (emailError != "") {
      setState({
        ...state,
        emailError,
      });
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    if (!password) {
      passwordError = "¡Introzca la contraseña!";
    } else if (password.length < 7) {
      passwordError = "¡Contraseña incorrecta!";
    }
    if (passwordError != "") {
      setState({
        ...state,
        passwordError,
      });
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      dispatch(loginUser(email, password));
      setState({
        ...state,
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (event) => {
    if (event.target.name == "email") state.emailError = "";
    else state.passwordError = "";

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const isLoggedIn = useSelector((state) => state.user.authenticated);
  const loginError = useSelector((state) => state.user.error);
  if (state.email != "") state.emailError = "";
  if (state.password != "") state.passwordError = "";

  if (isLoggedIn) {
    return null;
  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h3" style={boldText}>
            La Milla
          </Typography>
          <Typography component="h1" variant="h6">
            Gestión de asociaciones cannábicas
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Colaborador"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              onBlur={validateEmail}
            />
            <div className="invalid-feedback">{emailError}</div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              onBlur={validatePassword}
            />
            <div className="invalid-feedback">{passwordError}</div>
            <div className="invalid-feedback">{loginError}</div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
