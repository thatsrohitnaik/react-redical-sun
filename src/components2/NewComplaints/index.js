import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import FormGroup from '@material-ui/core/FormGroup';
import { useForm, Controller } from 'react-hook-form';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
//import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Input } from '@material-ui/core';
import { Input as AntdInput } from 'antd';

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

const NewComplaints = props => {
  const classes = useStyles();
  const [name, setName] = useState(props.client.name);
  const [phone, setPhone] = useState(props.client.phone);
  const [address, setAddress] = useState(props.client.address);
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const methods = useForm();
  const { handleSubmit, control, reset } = methods;
  const { addNewComplaint } = props;

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

  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <Controller
        as={Input}
        name="firstName"
        control={control}
        defaultValue=""
        className="materialUIInput"
      />
      <label>First Name</label>
      <Controller
        as={AntdInput}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <label>Ice Cream Preference</label>
      <Controller
        name="iceCreamType"
        as={Select}
        options={[
          { value: 'chocolate', label: 'Chocolate' },
          { value: 'strawberry', label: 'Strawberry' },
          { value: 'vanilla', label: 'Vanilla' }
        ]}
        control={control}
        defaultValue=""
      />
      <Controller
        name="Checkbox"
        control={control}
        render={props => (
          <Checkbox
            onChange={e => props.onChange(e.target.checked)}
            checked={props.value}
          />
        )}
      />

      <input type="submit" />
    </form>
  );

  // <form>
  //   <Grid container spacing={1}>
  //     <Grid item xs={6}>
  //       <FormControl variant="outlined" className={classes.formControl}>
  //         <TextField
  //           id="name"
  //           label="Client Name"
  //           required
  //           value={name}
  //           defaultValue={name}
  //           InputProps={{
  //             readOnly: true
  //           }}
  //           onChange={e => {
  //             setName(e.target.value);
  //           }}
  //           variant="outlined"
  //         />
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={6}>
  //       <FormControl variant="outlined" className={classes.formControl}>
  //         <TextField
  //           required
  //           id="phone"
  //           value={phone}
  //           label="Phone"
  //           defaultValue={phone}
  //           variant="outlined"
  //           onChange={e => {
  //             setPhone(e.target.value);
  //           }}
  //         />
  //       </FormControl>
  //     </Grid>

  //     <Grid item xs={6}>
  //       <FormControl
  //         required
  //         variant="outlined"
  //         className={classes.formControl}
  //       >
  //         <InputLabel id="demo-simple-select-outlined-label">
  //           Department
  //         </InputLabel>
  //         <Select
  //           labelId="demo-simple-select-outlined-label"
  //           id="department"
  //           value={department}
  //           onChange={e => {
  //             setDepartment(e.target.value);
  //           }}
  //           label="Department"
  //         >
  //           <MenuItem value="">
  //             <em>None</em>
  //           </MenuItem>
  //           <MenuItem value={10}>Plumbing</MenuItem>
  //           <MenuItem value={20}>Electric</MenuItem>
  //           <MenuItem value={30}>Cook</MenuItem>
  //         </Select>
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={6}>
  //       <FormControl variant="outlined" className={classes.formControl}>
  //         <TextField
  //           required
  //           value={address}
  //           id="address"
  //           label="Address"
  //           variant="outlined"
  //           defaultValue={address}
  //           onChange={e => {
  //             setAddress(e.target.value);
  //           }}
  //         />
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={12}>
  //       <FormControl variant="outlined" className={classes.formControl}>
  //         <TextField
  //           required
  //           rowsMax={4}
  //           value={description}
  //           id="description"
  //           label="Description"
  //           variant="outlined"
  //           defaultValue=""
  //           onChange={e => {
  //             setDescription(e.target.value);
  //           }}
  //         />
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={12}>
  //       <FormControl variant="outlined" className={classes.formControlButton}>
  //         <Button
  //           // onClick={handleSnackbarClick({
  //           //   vertical: 'bottom',
  //           //   horizontal: 'center'
  //           // })}
  //           // onClick={() => {
  //           //   onSubmit();
  //           // }}
  //           variant="contained"
  //           color="primary"
  //           onClick={() => {
  //             onSubmit();
  //           }}
  //         >
  //           Submit
  //         </Button>
  //       </FormControl>
  //     </Grid>
  //   </Grid>
  // </form>
  //);
};

export default NewComplaints;
