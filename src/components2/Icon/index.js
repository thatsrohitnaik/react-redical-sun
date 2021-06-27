import React from 'react';
import Icon from '@material-ui/core/Icon';

const NewIcon = prop => {
  let icon;
  switch (prop.icon) {
    case 'name':
      icon = 'account_circle';
      break;
    case 'phone':
      icon = 'settings_phone';
      break;
    case 'subscription':
      icon = 'fiber_manual_record';
      break;
    case 'address':
      icon = 'home';
      break;
  }
  return <Icon>{icon} </Icon>;
};

export default NewIcon;
