/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import ClientDetails from '../ClientDetails/';
import { inject, observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Complaints from '../Complaints/';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
});

class SearchClient extends React.Component {
  //const classes = useStyles();
  //const [value, setValue] = React.useState();

  //const [inputValue, setInputValue] = React.useState('');

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      inputValue: ''
    };
  }

  getClients = filter => {
    const data = [
      { code: 'AD', label: 'Joey', phone: '9673417124' },
      { code: 'AE', label: 'Chandler', phone: '8673417124' },
      { code: 'AF', label: 'Monica', phone: '9235379269' },
      { code: 'AG', label: 'Rachel', phone: '8345333445' },
      { code: 'AI', label: 'Pheobe', phone: '7643526189' },
      { code: 'AL', label: 'Ross', phone: '8355223445' }
    ];
    if (this.state.inputValue) {
      return data.filter(e => {
        return e.phone.startsWith(this.state.inputValue);
      });
    }
    return [];
  };

  render() {
    const {
      selectedClientPhone,
      setSelectedClientPhone,
      userComplaints
    } = this.props.clientStore;

    console.log(selectedClientPhone, 'oye');

    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Autocomplete
              id="country-select-demo"
              value={this.state.value}
              onChange={(event, newValue) => {
                this.setState({ value: newValue });
                setSelectedClientPhone(newValue);
              }}
              inputValue={this.state.inputValue}
              onInputChange={(event, newInputValue) => {
                this.setState({ inputValue: newInputValue });
              }}
              style={{ width: 300 }}
              options={this.getClients()}
              // classes={{
              //   option: classes.option
              // }}
              autoHighlight
              getOptionLabel={option => option.phone}
              renderOption={option => (
                <React.Fragment>
                  {/* <span>{countryToFlag(option.code)}</span> */}
                  {option.phone} + {': '} {option.label}
                </React.Fragment>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Client Phone"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password' // disable autocomplete and autofill
                  }}
                />
              )}
            />
            <div>
              {this.state.value ? (
                <ClientDetails value={this.state.inputValue} />
              ) : null}
            </div>
          </Grid>
          <Grid item xs={9}>
            {selectedClientPhone != null ? (
              <Complaints userComplaints={userComplaints} />
            ) : null}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default inject('clientStore')(observer(SearchClient));
