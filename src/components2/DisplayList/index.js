import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function DisplayList(props) {
  const classes = useStyles();
  const { data, header } = props;

  const keys = Object.keys(data);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {header}
        </ListSubheader>
      }
      className={classes.root}
    >
      {keys.map(item => {
        return (
          <ListItem button>
            <ListItemIcon>
              <Typography variant="subtitle1" gutterBottom>
                {item}
              </Typography>
            </ListItemIcon>
            <ListItemText primary={data[item]} />
          </ListItem>
        );
      })}
    </List>
  );
}