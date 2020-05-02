import React, { useState, useEffect } from "react";
import { validate } from "email-validator";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MaterialUIPickers from "./datePicker";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";

//Redux
import { addUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { USER_ERRORS, USER_HELPERS } from "../redux/types";
import { getUsersData } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    left: "20%",
  },
}));

export default function DeleteModal({ type }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    let id = event.target.id;
    let value = event.target.value;
    if (id === "name" || id === "lastName" || id === "city") {
      value = value.toLowerCase();
      value = value.replace(/\b\w/g, (l) => l.toUpperCase());
      console.log(value);
    }
    setState({
      ...state,
      [id]: value,
    });
  };
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validateBirthDate() && validateForm()) {
      dispatch(addUser(state));
    }
  };
  //Obtener la respuesta desde la tienda de redux
  const deleting = useSelector((state) => state.user.deleting);
  const deleted = useSelector((state) => state.user.deleted);
  const resDelete = useSelector((state) => state.user.resDelete);

  useEffect(() => {
    if (error.serverStatus) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  });

  //El cuerpo del modal
  const body = (
    <div className={classes.paper}>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        style={{ margin: ".8rem 0 .8rem 0" }}
      >
        Eliminar
      </Button>
      {deleting ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}
      <div className={deleted ? "validForm" : "invalidForm"}>
        {fail !== "" ? fail : helperText.serverStatus}
      </div>
    </div>
  );

  return (
    <div>
      {type == "add" ? (
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          style={{ margin: ".8rem 0 .8rem 0" }}
        >
          Añadir usuario
        </Button>
      ) : (
        <IconButton onClick={handleOpen} style={{ color: "yellow" }}>
          <EditIcon />
        </IconButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
