import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { toJS } from 'mobx';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
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

const tableSchema = [
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
  // {
  //   field: 'description',
  //   filter: 'text',
  //   sortable: true,
  //   width: '100px'
  // },
  // {
  //   field:"tech",
  //   filter:"text",
  //   sortable:true
  // },
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
  // {
  //   field: 'techNote',
  //   filter: 'text',
  //   sortable: false,
  //   width: '100px'
  // }
];

const Complaints = props => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = data => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => updateData(data));
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    selectedRows.length === 1 ? setSelectedRow(selectedRows[0]) : '';
    handleClickOpen();
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = event => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = event => {
    setFullWidth(event.target.checked);
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          defaultColDef={{
            flex: 1,
            sortable: true,
            filter: true
          }}
          rowSelection={'single'}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          rowData={toJS(props.userComplaints)}
        >
          {tableSchema.map(t => {
            return (
              <AgGridColumn
                field={t.field}
                filter={t.filter}
                sortable={t.sortable}
                width={t.width || ''}
              />
            );
          })}
        </AgGridReact>
      </div>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {/* <DialogTitle id="max-width-dialog-title">
          {selectedRow.department}
        </DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>{selectedRow.description}</DialogContentText> */}
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {selectedRow.complainDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <FastfoodIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Received
                  </Typography>
                  <Typography>{selectedRow.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            {selectedRow.assignedDate ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {selectedRow.assignedDate}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Assigned
                    </Typography>
                    <Typography>
                      {selectedRow.assignedNote}
                      {/* {selectedRow.tech
                        ? selectedRow.tech.map(t => {
                            return t + ' ';
                          })
                        : null}
                      ] */}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}

            {selectedRow.resolvedDate ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {selectedRow.resolvedDate}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <FastfoodIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Resolved
                    </Typography>
                    <Typography>{selectedRow.resolvedNote}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}
            {selectedRow.clientFeedback ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {/* {selectedRow.assignedDate} */}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Feedback
                    </Typography>
                    <Typography>{selectedRow.clientFeedback}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}
            {/* <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <HotelIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Sleep
                  </Typography>
                  <Typography>Because you need rest</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <RepeatIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Repeat
                  </Typography>
                  <Typography>Because this is the life you love!</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem> */}
          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Complaints;
