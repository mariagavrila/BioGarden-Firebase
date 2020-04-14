import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import WarningIcon from "@material-ui/icons/Warning";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import CloseIcon from "@material-ui/icons/Close";
import PaymentIcon from "@material-ui/icons/Payment";
import { getUsersData } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
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
  table: {
    minWidth: 650,
  },
}));

export default function Home(props) {
  let history = useHistory();

  const classes = useStyles();

  const [state, setState] = useState({
    users: [],
    nombre: "",
    apellido: "",
    dni: "",
    nsocio: "",
  });

  useEffect(() => {
    //hide table in firefox
    let table = document.getElementById("filterTable");
    if (table) {
      if (table.rows.length == 0)
        table.parentElement.style.visibility = "hidden";
      else {
        table.parentElement.style.visibility = "visible";
      }
    }
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  }

  const getUsers = async (e) => {
    e.preventDefault();
    document.querySelector(".noUser").textContent = "";
    await getUsersData({
      nombre: state.nombre,
      apellido: state.apellido,
      dni: state.dni,
      nsocio: state.nsocio,
    }).then((users) => {
      if (users.length == 0) {
        document.querySelector(".noUser").textContent =
          "No hay resultados que coincidan con la busqueda";
      }
      setState({
        ...state,
        users,
      });
    });
  };

  const isLoggedIn = useSelector((state) => state.user.authenticated);

  if (!isLoggedIn) {
    return null;
  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={getUsers}
        id="filterForm"
      >
        <TextField id="nombre" onChange={handleChange} label="Nombre" />
        <TextField id="apellido" onChange={handleChange} label="Apellido" />
        <TextField id="dni" onChange={handleChange} label="DNI" />
        <TextField id="nsocio" onChange={handleChange} label="N° Socio" />
        <Button type="submit" variant="outlined" color="primary" value="Submit">
          Buscar
        </Button>
      </form>

      <TableContainer component={Paper} id="tablePrincipal">
        <Table
          className={classes.table}
          aria-label="simple table"
          id="filterTable"
        >
          <TableBody>
            {state.users.map((row) => (
              <TableRow key={row.nsocio}>
                <TableCell align="right">{row.nombre}</TableCell>
                <TableCell align="right">N° {row.nsocio}</TableCell>
                <TableCell align="right">
                  <span>{row.inscripcion}</span>
                  <br />
                  <span style={{ color: "red" }}>{row.caducidad}</span>
                </TableCell>
                <TableCell align="right">
                  <DoneOutlineIcon
                    color="primary"
                    className={row.estado == "Activo" ? "show" : "hidden"}
                  />
                  <WarningIcon
                    color="primary"
                    className={row.estado == "1" ? "show" : "hidden"}
                  />
                  <AssignmentLateIcon
                    color="primary"
                    className={row.estado == "1" ? "show" : "hidden"}
                  />
                  <CloseIcon
                    color="primary"
                    className={row.estado == "1" ? "show" : "hidden"}
                  />
                  <PaymentIcon
                    color="primary"
                    className={row.estado == "1" ? "show" : "hidden"}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ color: "white" }}
                    onClick={(e) => history.push(`/usuario?id=${row.nsocio}`)}
                  >
                    Acceder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="noUser"></div>
    </main>
  );
}
