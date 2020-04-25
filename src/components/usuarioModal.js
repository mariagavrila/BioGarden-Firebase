import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import MaterialUIPickers from "./datePicker";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { validate } from "email-validator";
import { addUser } from "../redux/actions/userActions";

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

export default function SimpleModal({ type }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    name: false,
    lastName: false,
    dni: false,
    memberNumberInvite: false,
    email: false,
    birthDate: false,
    serverStatus: true,
  });
  const [helperText, setHelperText] = useState({
    name: "",
    lastName: "",
    dni: "",
    memberNumberInvite: "",
    email: "",
    birthDate: "",
    serverStatus: "",
  });
  const [state, setState] = useState({
    name: "",
    lastName: "",
    dni: "",
    birthDate: "",
    address: "",
    zip: "",
    phone: "",
    memberNumberInvite: "",
    ludicOrThepeutic: "lúdico",
    observation: "",
  });
  const handleRadio = (event) => {
    setState({
      ...state,
      ludicOrThepeutic: event.target.value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateSubmit() && validateForm()) {
      await addUser({ state }).then((response) => {
        let res = response.msg;
        setError({
          ...res.errors,
        });
        setHelperText({
          ...res.mensaje,
        });
        if (res.errors.serverStatus) {
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }

        console.log(res);
      });
    }
  };
  const handleCalendar = (date) => {
    setState({
      ...state,
      birthDate: date,
    });
  };
  const validate = (e, minLength, msg, requiredMsg) => {
    let target = e.target.id;
    let value = e.target.value;

    if (value.length == 0) {
      setError({
        ...error,
        [target]: true,
      });
      setHelperText({
        ...helperText,
        [target]: requiredMsg,
      });
    } else if (value.length < minLength) {
      setError({
        ...error,
        [target]: true,
      });
      setHelperText({
        ...helperText,
        [target]: msg,
      });
    } else {
      setError({
        ...error,
        [target]: false,
      });

      setHelperText({
        ...helperText,
        [target]: "",
      });
    }
  };

  const validateSubmit = () => {
    if (state.birthDate == "") {
      setError({
        ...error,
        birthDate: true,
      });
      setHelperText({
        ...helperText,
        birthDate: "La fecha de nacimiento es obligatoria",
      });
    } else {
      setError({
        ...error,
        birthDate: false,
      });

      setHelperText({
        ...helperText,
        birthDate: "",
      });
    }
    if (
      !error.name &&
      !error.lastName &&
      !error.dni &&
      !error.memberNumberInvite
    )
      return true;
    else return false;
  };
  const validateForm = () => {
    if (
      state.name != "" &&
      state.lastName != "" &&
      state.dni != "" &&
      state.birthDate != "" &&
      state.memberNumberInvite != ""
    )
      return true;
    else return false;
  };
  const body = (
    <div className={classes.paper}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            id="name"
            label="Nombre*"
            type="search"
            onChange={handleChange}
            onBlur={(e) => {
              validate(
                e,
                3,
                "El nombre no es correcto",
                "El nombre es obligatorio"
              );
            }}
            error={error.name}
            helperText={helperText.name}
          />
          <TextField
            id="lastName"
            label="Apellidos*"
            type="search"
            onChange={handleChange}
            onBlur={(e) => {
              validate(
                e,
                3,
                "El apellido no es correcto",
                "El apellido es obligatorio"
              );
            }}
            error={error.lastName}
            helperText={helperText.lastName}
          />
          <TextField
            id="dni"
            label="Dni*"
            type="search"
            onChange={handleChange}
            onBlur={(e) => {
              validate(e, 9, "El DNI no es correcto", "El DNI es obligatorio");
            }}
            error={error.dni}
            helperText={helperText.dni}
          />
          <MaterialUIPickers
            handleCalendar={handleCalendar}
            error={error.birthDate}
            helperText={helperText.birthDate}
          />
          <TextField
            id="address"
            label="Dirección"
            type="search"
            onChange={handleChange}
          />
          <TextField
            id="zip"
            label="Código postal"
            type="search"
            onChange={handleChange}
          />
          <TextField
            id="phone"
            label="Teléfono"
            type="search"
            onChange={handleChange}
          />
          <TextField
            id="email"
            label="E-mail"
            type="search"
            onChange={handleChange}
            error={error.email}
            helperText={helperText.email}
          />
          <TextField
            id="memberNumberInvite"
            label="Invitación*"
            type="search"
            onChange={handleChange}
            onBlur={(e) => {
              validate(e, 1, "", "El número de invitado es obligatorio");
            }}
            error={error.memberNumberInvite}
            helperText={helperText.memberNumberInvite}
          />
        </div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <RadioGroup
              id="ludicOrThepeutic"
              value={state.ludicOrThepeutic}
              onChange={handleRadio}
            >
              <FormControlLabel
                value="lúdico"
                control={<Radio color="primary" />}
                label="Socio lúdico"
              />
              <FormControlLabel
                value="terapeútico"
                control={<Radio color="primary" />}
                label="Socio terapeútico"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="observations"
              label="Observaciones"
              multiline
              rows="2"
              rowsMax="2"
              fullWidth
              size="medium"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              style={{ width: "95%" }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <div className={error.serverStatus ? "invalidForm" : "validForm"}>
          {helperText.serverStatus}
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: ".8rem 0 .8rem 0" }}
        >
          Añadir usuario
        </Button>
      </form>
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
