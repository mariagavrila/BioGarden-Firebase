import "date-fns";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_ERRORS, USER_HELPERS } from "../redux/types";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers({ handleCalendar }) {
  const dispatch = useDispatch();

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var maxDate = new Date(year - 18, month, day);
  const [selectedDate, setSelectedDate] = useState(maxDate);

  const handleDateChange = (date) => {
    dispatch({
      type: USER_ERRORS,
      payload: {
        birthDate: false,
      },
    });
    dispatch({
      type: USER_HELPERS,
      payload: {
        birthDate: "",
      },
    });
    setSelectedDate(date);
    handleCalendar(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };
  const errorDate = useSelector((state) => state.user.validUser.birthDate);
  const helperTextDate = useSelector(
    (state) => state.user.helperUser.birthDate
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        error={errorDate}
        helperText={helperTextDate}
        margin="normal"
        id="date-picker-dialog"
        label="Fecha nacimiento*"
        format="dd/MM/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        disableFuture
        maxDate={maxDate}
      />
    </MuiPickersUtilsProvider>
  );
}
