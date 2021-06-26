import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { inject, observer } from 'mobx-react';
import Icon from '@material-ui/core/Icon';

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

class ClientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }
  render() {
    const {
      address,
      label,
      phone,
      status
    } = this.props.clientStore.selectedClientDetails;

    console.log(this.props.clientStore.selectedClientDetails);

    const handleClick = () => {
      this.setState({ open: !this.state.open });
    };
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Client Details
          </ListSubheader>
        }
        // className={classes.root}
      >
        <ListItem button>
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>settings_phone</Icon>
          </ListItemIcon>
          <ListItemText primary={phone} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Icon>fiber_manual_record</Icon>
          </ListItemIcon>
          <ListItemText primary={status} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Icon>home</Icon>
          </ListItemIcon>
          <ListItemText primary={address} />
        </ListItem>
        {/* <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={address} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}
        {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse> */}
      </List>
    );
  }
}

export default inject('clientStore')(observer(ClientDetails));
