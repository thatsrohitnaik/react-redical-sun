import React from 'react';
import Autocomplete from '../components2/Autocomplete/';
import DisplayList from '../components2/DisplayList/';
import Table from '../components2/Table/';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewComplaints from '../components2/NewComplaints/';
import ComplaintDialog from '../components2/ComplaintDialog/';
import Snackbar from '@material-ui/core/Snackbar';

const complaintTableSchema = {
  setting: [{ defaultSort: '' }],
  schema: [
    {
      field: 'department',
      filter: 'text',
      sortable: true,
      width: '100px'
    },
    {
      field: 'status',
      filter: 'text',
      sortable: true,
      width: '100px',
      sort: 'desc'
    },
    {
      field: 'complainDate',
      sortable: true,
      width: '100px'
    },
    {
      field: 'assignedDate',
      sortable: true,
      width: '100px'
    },
    {
      field: 'resolvedDate',
      sortable: true,
      width: '100px'
    }
  ]
};

const rowData = [
  {
    department: 'Plumbing',
    status: 'Unassigned',
    description:
      ' Water is leaking in our bathroom, since yesterday, there is water all over the house we need your services asap. we need plumber and electrician too',
    tech: ['Gary', 'herry'],
    complainDate: '10/01/2021',
    assignedDate: '',
    assignedNote: 'Assigned to Gerry',
    resolvedDate: '',
    resolvedNote: '',
    techNote: ''
  },
  {
    department: 'Electric',
    status: 'Assigned',
    description: ' Water is leaking in our bathroom',
    tech: ['Gary', 'herry'],
    complainDate: '10/02/2021',
    assignedDate: '11/02/2021',
    assignedNote: 'Assigned to Gerry',
    resolvedDate: '',
    resolvedNote: '',
    techNote: ''
  },
  {
    department: 'Plumbing',
    status: 'Resovled',
    description: ' Water is leaking in our bathroom',
    tech: ['Gary', 'herry'],
    complainDate: '10/03/2021',
    assignedDate: '11/03/2021',
    assignedNote: 'Assigned to Gerry',
    resolvedDate: '12/03/2021',
    resolvedNote: 'Work was completed',
    clientFeedback: 'Job was done very professionally'
  }
];

export default class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
      selectedComplaint: {},
      showSwitch: 1,
      showDialog: false,
      allComplaints: [],
      openSnack: false,
      snackMessage: ''
    };
  }
  setClient = value => {
    this.setState({
      client: value,
      showSwitch: 1
    });
    console.log('setting client');
    if (value) {
      this.fetchAllComplaints(value.phone);
    }
  };

  fetchAllComplaints = phone => {
    console.log(phone);
    return rowData;
  };

  addNewComplaint = complaint => {
    rowData.push(complaint);
    console.log(complaint, 'new');
    this.setState({
      showSwitch: 1,
      openSnack: true,
      snackMessage: 'Complaint Registered'
    });
  };

  toggle = value => {
    this.setState({
      showSwitch: value
    });
  };

  toggleDialog = value => {
    this.setState({ showDialog: value });
    console.log(this.state.showDialog);
  };

  onClickList = (item, value) => {
    console.log(item, value);
    if (item === 'subscription') {
      this.setState({
        showSwitch: 3
      });
    }
  };

  onSelection = value => {
    this.setState({
      selectedComplaint: value[0]
    });
    this.toggleDialog(true);
    console.log(value, 'value');
  };

  handleSnackbarClose = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { client, showSwitch } = this.state;
    return (
      <>
        <Grid container spacing={1}>
          <Grid item lg={3}>
            <Autocomplete url={'/data.json'} setValue={this.setClient} />
            {client != null ? (
              <DisplayList
                onClickList={this.onClickList}
                data={client}
                header={'Client Detail'}
              />
            ) : null}
            {client &&
            client.subscription === 'Active' &&
            (showSwitch == 1 || showSwitch === 3) ? (
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => this.toggle(2)}
              >
                New Complaint
              </Button>
            ) : null}
            {client && (showSwitch === 2 || showSwitch === 3) ? (
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => this.toggle(1)}
              >
                All Complaint
              </Button>
            ) : null}
          </Grid>
          <Grid item lg={9}>
            {client && showSwitch == 1 ? (
              <Table
                tableSchema={complaintTableSchema}
                rowData={rowData}
                onSelection={this.onSelection}
              />
            ) : null}
            {client && client.subscription === 'Active' && showSwitch == 2 ? (
              <NewComplaints
                client={client}
                addNewComplaint={this.addNewComplaint}
              />
            ) : null}
            {
              <ComplaintDialog
                selectedComplaint={this.state.selectedComplaint}
                toggleDialog={this.toggleDialog}
                showDialog={this.state.showDialog}
              />
            }
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.openSnack}
          onClose={this.handleSnackbarClose}
          message={this.state.snackMessage}
          // key={vertical + horizontal}
        />
      </>
    );
  }
}
