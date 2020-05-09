import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import "./styles/socios.css";
import DeleteModal from "../components/confirmDelete";
//Material UI
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
import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import SimpleModal from "../components/usuarioModal";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LinearProgress from "@material-ui/core/LinearProgress";
import LastPageIcon from "@material-ui/icons/LastPage";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import NumberFormat from "react-number-format";
import Divider from "@material-ui/core/Divider";
//Redux
import { addNewProduct, getProducts } from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginBottom: "1.5rem",
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
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: 0,
  },
  layout: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  header: {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: ".5rem",
  },
  cell: {
    padding: ".4rem",
  },
  textField: {
    width: "50ch",
  },
}));

export default function Productos(props) {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    section: "Fruta",
    category: "",
    name: "",
    price: "",
    stock: "",
    unit: "Kg",
  });
  console.log(newProduct);
  let products = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getProducts();
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
    setNewProduct({
      ...newProduct,
      [e.target.id]: e.target.value,
    });
  }
  function handleRadio(e) {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  }
  const addProduct = (e) => {
    if (e) e.preventDefault();
    dispatch(addNewProduct(newProduct));
  };
  const isLoading = useSelector((state) => state.user.loadingUsers);
  const users = useSelector((state) => state.user.users);
  const alert = useSelector((state) => state.user.error);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Productos
  products = useSelector((state) => state.data.products);

  const categoriesProps = {
    options: products,
    getOptionLabel: (option) => {
      if (option.section === newProduct.section) return option.category;
    },
  };
  const handleSearch = (text) => {};
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.layout}>
        <Typography component="h1" variant="h5" align="center">
          Añadir producto
        </Typography>
        <Divider variant="middle" style={{ marginBottom: ".2rem" }} />
        <form noValidate autoComplete="off" onSubmit={addProduct}>
          <Grid container spacing={1} style={{ textAlign: "center" }}>
            <Grid item xs={6} sm={3}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="section"
                  defaultValue={newProduct.section}
                  onChange={handleRadio}
                >
                  <FormControlLabel
                    value="Fruta"
                    control={<Radio color="primary" />}
                    label="Fruta"
                  />
                  <FormControlLabel
                    value="Verdura"
                    control={<Radio color="primary" />}
                    label="Verduras y hortalizas"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                {...categoriesProps}
                id="categories"
                blurOnSelect
                renderInput={(params) => (
                  <TextField {...params} label="Categoría" margin="normal" />
                )}
                onChange={(event, newValue) => {
                  setNewProduct({
                    ...newProduct,
                    category: newValue.category,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3} style={{ marginTop: ".9rem" }}>
              <TextField id="name" onChange={handleChange} label="Producto" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                style={{ margin: ".8rem 2rem 0 0" }}
                label="Precio"
                onChange={handleChange}
                name="numberformat"
                id="price"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                style={{ margin: "1rem 2rem 0 0" }}
              >
                <RadioGroup
                  row
                  name="unit"
                  defaultValue={newProduct.unit}
                  onChange={handleRadio}
                >
                  <FormControlLabel
                    value="Kg"
                    control={<Radio color="primary" />}
                    label="Por kg"
                  />
                  <FormControlLabel
                    value="Ud."
                    control={<Radio color="primary" />}
                    label="Por unidad"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="cantidad"
                onChange={handleChange}
                label="Cantidad"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      {newProduct.unit}
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                style={{ margin: "1rem 1rem", padding: ".3rem 2rem" }}
                type="submit"
                variant="outlined"
                color="primary"
                value="Submit"
              >
                Añadir
              </Button>
            </Grid>
          </Grid>
        </form>
        {isLoading ? (
          <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
        ) : null}
      </Paper>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.title} colSpan={3}>
                <Typography variant="h4" style={{ fontSize: "1.9rem" }}>
                  Existencias
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.title} colSpan={4}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="search">Buscar</InputLabel>
                  <Input
                    id="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>{<SearchIcon />}</IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.header}>
                Producto
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Sección
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Categoría
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Precio
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Existencias
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Unidad/Kg
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Eliminar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0
              ? users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.userId}>
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
                          className={row.estado === "1" ? "show" : "hidden"}
                        />
                        <AssignmentLateIcon
                          style={{ color: "rgb(255, 196, 0)" }}
                          className={row.estado == "2" ? "show" : "hidden"}
                        />
                        <WarningIcon
                          style={{ color: "rgb(255, 72, 0)" }}
                          className={row.estado == "3" ? "show" : "hidden"}
                        />
                        <CloseIcon
                          style={{ color: "red" }}
                          className={row.estado == "4" ? "show" : "hidden"}
                        />
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        <SimpleModal type="edit" user={row.userId} />
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        <DeleteModal id={row.userId} />
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
                  ))
              : null}
          </TableBody>
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
      {users.length === 0 && isLoading === false ? (
        <div className="noUser">
          {alert != ""
            ? alert
            : "No hay resultados que coincidan con la busqueda."}
        </div>
      ) : null}
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
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
