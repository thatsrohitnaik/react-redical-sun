import React from 'react';
import Autocomplete from '../components2/Autocomplete/';
import DisplayList from '../components2/DisplayList/';
import Table from '../components2/Table/';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const complaintTableSchema = [
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
    width: '100px'
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
];

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
      complaint: {},
      showSwitch: 1
    };
  }
  setClient = value => {
    this.setState({
      client: value
    });
  };

  toggle = value => {
    this.setState({
      showSwitch: value
    });
  };

  onSelection = value => {
    this.setState({
      complaint: value
    });
    console.log(this.state.complaint);
  };

  render() {
    const { client, showSwitch } = this.state;
    return (
      <>
        <Grid container spacing={1}>
          <Grid item lg={3}>
            <Autocomplete url={'/data.json'} setValue={this.setClient} />
            {client != null ? (
              <DisplayList data={client} header={'Client Detail'} />
            ) : null}
            {client && client.subscription === 'Active' ? (
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => this.toggle(2)}
              >
                New Complaint
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
          </Grid>
        </Grid>
      </>
    );
  }
}
