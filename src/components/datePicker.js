import "date-fns";
import React, { useState, useEffect } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function MaterialUIPickers({
  handleCalendar,
  error = false,
  helperText = "",
}) {
  let errorCalendar = error;
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var maxDate = new Date(year - 18, month, day);
  const [selectedDate, setSelectedDate] = useState(maxDate);
  const [errorDate, setError] = useState(error);
  const [helperTextDate, setHelperText] = useState(helperText);
  const [isUpdated, update] = useState(false);

  useEffect(() => {
    if (!isUpdated) setError(error);
  });

  const handleDateChange = (date) => {
    update(true);
    setError(error);
    setHelperText("");
    setSelectedDate(date);
    handleCalendar(
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

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
