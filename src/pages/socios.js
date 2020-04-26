import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import WarningIcon from "@material-ui/icons/Warning";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import CloseIcon from "@material-ui/icons/Close";
import PaymentIcon from "@material-ui/icons/Payment";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import { getUsersData } from "../redux/actions/userActions";
import SimpleModal from "../components/usuarioModal";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LinearProgress from "@material-ui/core/LinearProgress";
import LastPageIcon from "@material-ui/icons/LastPage";
import "./styles/socios.css";

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
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: 0,
  },
  header: {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: ".7rem",
  },
  cell: {
    padding: ".4rem",
  },
}));

export default function Socios(props) {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    nsocio: "",
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getUsers();
    //hide table in firefox
    // let table = document.getElementById("filterTable");
    // if (table) {
    //   if (table.rows.length == 0)
    //     table.parentElement.style.visibility = "hidden";
    //   else {
    //     table.parentElement.style.visibility = "visible";
    //   }
    // }
  }, []);

  function handleChange(e) {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  }

  const getUsers = (e) => {
    if (e) e.preventDefault();
    dispatch(
      getUsersData({
        nombre: state.nombre,
        apellido: state.apellido,
        dni: state.dni,
        nsocio: state.nsocio,
      })
    );
  };
  const isLoading = useSelector((state) => state.user.loadingUsers);
  const users = useSelector((state) => state.user.users);
  const alert = useSelector((state) => state.user.error);
  if (users) console.log(users.length);
  const editSocio = (id) => {
    console.log(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <SimpleModal type="add" />
      <SimpleModal type="edit" />
      {isLoading ? <LinearProgress color="primary" /> : null}

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <DoneOutlineIcon color="primary" fontSize="large" />
                <p className="iconos"> Todo OK</p>
              </Grid>
              <Grid item xs={3}>
                <WarningIcon
                  style={{ color: "rgb(255, 72, 0)" }}
                  fontSize="large"
                />
                <p className="iconos">Socio lleva X meses sin venir</p>
              </Grid>
              <Grid item xs={2}>
                <AssignmentLateIcon
                  style={{ color: "rgb(255, 196, 0)" }}
                  fontSize="large"
                />
                <p className="iconos"> Falta algún dato</p>
              </Grid>
              <Grid item xs={2}>
                <CloseIcon style={{ color: "red" }} fontSize="large" />
                <p className="iconos"> Socio desactivado</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <TableContainer component={Paper} id="tablaUsuarios">
        <Table className={classes.table} id="filterTable">
          <TableHead>
            <TableRow className="tablaUsuarios">
              <TableCell align="center" className={classes.header}>
                Socio
              </TableCell>
              <TableCell align="center" className={classes.header}>
                N°
              </TableCell>
              <TableCell align="center" className={classes.header}>
                <span>Inscripción</span>
                <br />
                <span style={{ color: "red" }}>Caducidad</span>
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Estado
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Editar
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Eliminar
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Acceder
              </TableCell>
            </TableRow>
          </TableHead>
          {users.length > 0 ? (
            users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableBody>
                  <TableRow key={row.nsocio}>
                    <TableCell align="center" className={classes.cell}>
                      {row.nombre}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      N° {row.nsocio}
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      <span>{row.inscripcion}</span>
                      <br />
                      <span style={{ color: "red" }}>{row.caducidad}</span>
                    </TableCell>
                    <TableCell align="center">
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
                    <TableCell align="center" className={classes.cell}>
                      <IconButton onClick={(e) => editSocio(row.nsocio)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      <IconButton>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center" className={classes.cell}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ color: "white" }}
                        onClick={(e) =>
                          history.push(`/usuario?id=${row.nsocio}`)
                        }
                      >
                        Acceder
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
          ) : (
            <div className="noUser">
              {alert != ""
                ? alert
                : "No hay resultados que coincidan con la busqueda"}
            </div>
          )}
          {users.length > 0 ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Líneas por página"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todos", value: -1 },
                  ]}
                  colSpan={3}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  ActionsComponent={TablePaginationActions}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
    </main>
  );
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
