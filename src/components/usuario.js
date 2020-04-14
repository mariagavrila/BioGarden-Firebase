import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { getUserData } from "../redux/actions/userActions";
import Button from "@material-ui/core/Button";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import "./components.css";
import ListAltIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "25vh"
  }
}));

function createData(fecha, comentario) {
  return { fecha, comentario };
}

const rows = [
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  ),
  createData(
    "15-03-2020 13:53:51",
    "Ha retirado de la genetica cahalote un total de 4 g"
  )
];

export default function Usuario(props) {
  const classes = useStyles();
  const { match } = props;
  let id = props.location.search.split("=")[1];

  const [state, setState] = useState({
    name: "",
    lastName: "",
    dni: "",
    consum: "",
    startInsc: "",
    endInsc: ""
  });

  useEffect(() => {
    getUserData(id).then(userData => {
      setState({
        ...state,
        ...userData
      });
    });
  }, []);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h4 className="rightText">{`Socio N° ${id}`}</h4>
            <h6 className="userData capitalize">{`${state.name} ${state.lastName}`}</h6>
            <hr style={{ border: ".5px dotted", marginTop: 0 }} />
            <h6 className="userData">{`DNI ${state.dni}`}</h6>
            <h6 className="userData">{`Socio ${state.consum}`}</h6>
            <h6 className="userData">{`Inscripción ${state.startInsc}`}</h6>
            <h6 className="userData">{`Caducidad ${state.endInsc}`}</h6>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <p className="grConsum">0gr consumidos / 15.00gr dia</p>
                <p className="grConsum">0gr consumidos / 15.00gr dia</p>
                <Button variant="outlined" color="dark" className="buttonCart">
                  <AccountBalanceWalletIcon color="primary" fontSize="large" />
                  <p className="insideButton">
                    Saldo <br />
                    0Crd
                  </p>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <img src={require("../images/scales.png")} id="scales"></img>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} id="alertUser">
            Este socio tiene su tarjeta caducada desde el 12/02/2020
          </Paper>
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "1.8rem",
          background: "rgba(143, 115, 49, 0.253)"
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead className="tablaHistorial">
            <TableRow>
              <TableCell
                align="center"
                style={{ fontSize: "2rem" }}
                colSpan={12}
              >
                <ListAltIcon
                  color="action"
                  fontSize="large"
                  className="floatLeft"
                />
                Historial del usuario
                <Button
                  variant="contained"
                  color="light"
                  className="floatRight"
                >
                  Publicar Comentario
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.fecha}>
                <TableCell align="right">{row.fecha}</TableCell>
                <TableCell align="right">{row.comentario}</TableCell>
                <TableCell align="right">
                  <CloseIcon style={{ color: "red" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
