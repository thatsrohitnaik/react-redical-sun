import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './stores/';

import Drawer from './Drawer';

ReactDOM.render(
  <Provider {...stores}>
    <Drawer />
  </Provider>,
  document.getElementById('root')
);
