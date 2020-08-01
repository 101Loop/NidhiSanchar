import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";

export default function CalenderDatePicker(props) {
  const { handleDateChange, selectedDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          label="Select launch date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{ "aria-label": "change date" }}
        />
      </Grid>{" "}
    </MuiPickersUtilsProvider>
  );
}
