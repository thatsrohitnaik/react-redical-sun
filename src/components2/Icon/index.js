import React from 'react';
import Icon from '@material-ui/core/Icon';
import './style.css';

const NewIcon = prop => {
  let icon;
  const { className } = prop;
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
    case 'recived':
      icon = 'mark_email_unread';
      break;
    case 'assigned':
      icon = 'hourglass_bottom';
      break;
    case 'resolved':
      icon = 'check_circle';
      break;
    case 'feedback':
      icon = 'rate_review';
      break;
  }
  return <Icon className={className + ' icon'}>{icon} </Icon>;
};

export default NewIcon;
