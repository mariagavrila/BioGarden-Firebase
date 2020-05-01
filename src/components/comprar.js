import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function BuyForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Productos comprados
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup row name="position" defaultValue="porKg">
              <FormControlLabel
                value="porPieza"
                control={<Radio color="primary" />}
                label="Por pieza"
              />
              <FormControlLabel
                value="porKg"
                control={<Radio color="primary" />}
                label="Por kg"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Cantidad</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="weight"
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
