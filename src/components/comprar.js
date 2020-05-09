import React, { useState, useEffect } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";

//Redux
import { useSelector, useDispatch } from "react-redux";

export default function BuyForm() {
  let products = [];

  const [section, setSection] = useState("Fruta");
  const [category, setCategory] = useState("");
  console.log(category);

  //Productos
  products = useSelector((state) => state.data.products);
  console.log(products);
  useEffect(() => {});

  const categoriesProps = {
    options: products,
    getOptionLabel: (option) => {
      if (option.section === section) return option.category;
    },
  };
  const productoProps = {
    options: products,
    getOptionLabel: (option) => {
      if (option.section === section && option.category === category) {
        return option.category;
      } else return "";
    },
  };

  const handleRadio = (event) => {
    setSection(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Productos comprados
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="position"
              defaultValue={section}
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
          <Autocomplete
            {...categoriesProps}
            id="categories"
            blurOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Categorías" margin="normal" />
            )}
            onChange={(event, newValue) => {
              setCategory(newValue.category);
            }}
          />
          <Autocomplete
            {...productoProps}
            id="products"
            blurOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Producto" margin="normal" />
            )}
          />
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
