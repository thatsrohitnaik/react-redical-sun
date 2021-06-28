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
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
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
  const { addNewComplaint } = props;
  const [invalidField, setInvalidFields] = useState([]);
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

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const complainDate = date + '/' + month + '/' + year;

  const onSubmit = () => {
    const formData = {
      name,
      phone,
      description,
      department,
      address,
      complainDate,
      status: 'Unassigned'
    };
    formValid();
  };

  const formValid = () => {
    const formData = {
      name,
      phone,
      description,
      department,
      address,
      complainDate,
      status: 'Unassigned'
    };
    const send = key => {
      if (key === 'description') {
        if (formData[key].length > 20) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    };

    const invalidField = Object.keys(formData).filter(key =>
      formData[key] ? send(key) : true
    );

    invalidField.length === 0
      ? addNewComplaint(formData)
      : setInvalidFields(invalidField);
  };

  return (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="name"
              label="Client Name"
              required
              value={name}
              defaultValue={name}
              InputProps={{
                readOnly: true
              }}
              onChange={e => {
                setName(e.target.value);
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              required
              id="phone"
              value={phone}
              label="Phone"
              defaultValue={phone}
              variant="outlined"
              onChange={e => {
                setPhone(e.target.value);
              }}
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
              id="department"
              value={department}
              onChange={e => {
                setDepartment(e.target.value);
              }}
              label="Department"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Plumbing'}>Plumbing</MenuItem>
              <MenuItem value={'Electric'}>Electric</MenuItem>
              <MenuItem value={'Cook'}>Cook</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              required
              value={address}
              id="address"
              label="Address"
              variant="outlined"
              defaultValue={address}
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              required
              multiline
              rowsMax={4}
              value={description}
              id="description"
              label="Description"
              variant="outlined"
              defaultValue=""
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControlButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onSubmit();
              }}
            >
              Submit
            </Button>
          </FormControl>
        </Grid>
        {invalidField.length > 0 ? (
          <Grid item xs={12}>
            {'Invalid Field: '}
            {invalidField.map(item => {
              if (item === 'description') {
                return <a>{item + '(min 20 char) '}</a>;
              } else {
                return <a>{item + ' '}</a>;
              }
            })}
          </Grid>
        ) : null}
      </Grid>
    </form>
  );
};

export default NewComplaints;

// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { TextField, Checkbox } from '@material-ui/core';

// const defaultValues = {
//   Native: '',
//   TextField: '',
//   Select: '',
//   ReactSelect: { value: 'vanilla', label: 'Vanilla' },
//   Checkbox: false,
//   switch: false,
//   RadioGroup: '',
//   numberFormat: 123456789,
//   downShift: 'apple'
// };

// function NewComplaints(props) {
//   const methods = useForm();
//   const { handleSubmit, register, reset, control } = useForm({ defaultValues });
//   const [name, setName] = useState(props.client.name);
//   const [phone, setPhone] = useState(props.client.phone);
//   const [address, setAddress] = useState(props.client.address);
//   const [department, setDepartment] = useState('');
//   const [description, setDescription] = useState('');
//   const { addNewComplaint } = props;
//   const [data, setData] = useState(null);

//   const onSubmit = e => {
//     e.preventDefault();

//     console.log('hhhhh', data);

//     handleSubmit(data => {
//       console.log(data, 'fffffff');
//       setData(data);
//     });
//     console.log('hhhnhhh', data);
//   };

//   return (
//     <>
//       <form className="form">
//         {/* Option 1: pass a component to the Controller. */}
//         <Controller
//           control={control}
//           render={props => (
//             <TextField
//               required
//               id="phone"
//               label="Phone"
//               defaultValue={phone}
//               variant="outlined"
//               name="TextField"
//               onChange={e => {
//                 setPhone(e.target.value);
//               }}
//             />
//           )}
//         />

//         {/* Option 2: use render props to assign events and value */}
//         <Controller
//           name="MyCheckbox"
//           control={control}
//           defaultValue={false}
//           rules={{ required: true }}
//           render={props => (
//             <Checkbox
//               onChange={e => props.onChange(e.target.checked)}
//               checked={props.value}
//             />
//           )} // props contains: onChange, onBlur and value
//         />
//         <button
//           onClick={e => {
//             onSubmit(e);
//           }}
//         />
//       </form>
//       {data && (
//         <pre style={{ textAlign: 'left', color: 'white' }}>
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       )}
//     </>
//   );
// }

// export default NewComplaints;
