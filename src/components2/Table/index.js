import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { toJS } from 'mobx';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const Table = props => {
  const { tableSchema, rowData, onSelection } = props;
  console.log(props);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    onSelection(selectedRows);
  };

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };
  return (
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
        rowData={rowData}
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
  );
};

export default Table;
