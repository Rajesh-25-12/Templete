import React from 'react'
import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  Stack,
  AppBar,
  Toolbar,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import DynamicTransferList  from '../Components/Transferlist';
const Configure = () => {
  const List=[
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 2, name: 'Option 2' },
  ]
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1992 },
    { label: 'Pulp Fiction', year: 1994 }]
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const li=(props)=>{
console.log(props,"listt")
  }
  return (
    <div style={{ margin: "0 8vh" }}>
    <br />
    <AppBar position="static" class="appbar">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h6">Vehicle</Typography>
        </Box>
        <Grid align="right">
          <div class="tooltip">
            <Button
              varient="text"
              className="n_btn"
              onClick={() => window.history.go(-1)}
            >
              <ArrowBackIcon style={{ color: "#000" }}></ArrowBackIcon>
            </Button>
            <span class="tooltiptext">Go Back </span>
          </div>
        </Grid>
      </Toolbar>
    </AppBar>   
    <br/>
    <Grid  container gap={5}>
      <Grid item xs={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={20}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Grid>
  
      <Grid  xs={8}>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
      </Grid>
      <Grid item xs={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={20}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={8}>
      <DynamicTransferList  leftdata={List} rightdata={[]} values={"name"} data={li}/>

      </Grid>
    </Grid>
   
    </div>
  )
}

export default Configure
