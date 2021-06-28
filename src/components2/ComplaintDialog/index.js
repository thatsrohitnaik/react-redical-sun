import React, { useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Typography from '@material-ui/core/Typography';
import NewIcon from '../Icon/';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const ComplaintDialog = props => {
  const { selectedComplaint, toggleDialog, showDialog } = props;
  const classes = useStyles();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    toggleDialog(false);
  };

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {/* <DialogTitle id="max-width-dialog-title">
          {selectedComplaint.department}
        </DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText>{selectedComplaint.description}</DialogContentText> */}
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {selectedComplaint.complainDate}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot>
                  <NewIcon icon="recived" className="default-icon" />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography variant="h6" component="h1">
                    Received
                  </Typography>
                  <Typography>{selectedComplaint.description}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            {selectedComplaint.assignedDate ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {selectedComplaint.assignedDate}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <NewIcon icon="assigned" className="default-icon" />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Assigned
                    </Typography>
                    <Typography>
                      {selectedComplaint.assignedNote}
                      {/* {selectedComplaint.tech
                        ? selectedComplaint.tech.map(t => {
                            return t + ' ';
                          })
                        : null}
                      ] */}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}

            {selectedComplaint.resolvedDate ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {selectedComplaint.resolvedDate}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <NewIcon icon="resolved" className="default-icon" />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Resolved
                    </Typography>
                    <Typography>{selectedComplaint.resolvedNote}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}
            {selectedComplaint.clientFeedback ? (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {/* {selectedComplaint.assignedDate} */}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary">
                    <NewIcon icon="feedback" className="default-icon" />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h6" component="h1">
                      Feedback
                    </Typography>
                    <Typography>{selectedComplaint.clientFeedback}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ) : null}
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

export default ComplaintDialog;
