import './style.css';
import SearchClient from './components/SearchClient/';
import React, { useEffect, useContext } from 'react';
//import { StoreContext } from './context/';
import { inject, observer } from 'mobx-react';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SearchClient />
      </div>
    );
  }
}


export default inject('clientStore')(observer(App));
