import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  formControlButton: {
    marginTop: theme.spacing(2),
    width: '100px',
    marginLeft: 'auto',
    display: 'block'
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const Complaints = props => {
  const classes = useStyles();

  const { name, phone, address } = props.client;
  const [department, setDepartment] = useState('');

  const handleSelectChange = event => {
    setDepartment(event.target.value);
  };

  const [state, setState] = React.useState({
    openSnack: false,
    vertical: 'top',
    horizontal: 'center'
  });

  const { vertical, horizontal, openSnack } = state;

  const handleSnackbarClick = newState => () => {
    setState({ openSnack: true, ...newState });
  };

  const handleSnackbarClose = () => {
    setState({ ...state, openSnack: false });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="outlined-read-only-input"
            label="Client Name"
            required
            defaultValue={name}
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            required
            id="outlined-required"
            label="Phone"
            defaultValue={phone}
            variant="outlined"
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Department
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={department}
            onChange={handleSelectChange}
            label="Department"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Plumbing</MenuItem>
            <MenuItem value={20}>Electric</MenuItem>
            <MenuItem value={30}>Cook</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            required
            id="outlined-required"
            label="Address"
            variant="outlined"
            defaultValue={address}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            required
            id="outlined-required"
            label="Description"
            variant="outlined"
            defaultValue=""
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" className={classes.formControlButton}>
          <Button
            onClick={handleSnackbarClick({
              vertical: 'bottom',
              horizontal: 'center'
            })}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Complaints;
