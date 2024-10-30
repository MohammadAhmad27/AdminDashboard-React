import "./datatable.scss"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";


const paginationModel = { page: 0, pageSize: 9 };

export default function DataTable() {
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to='/users/test' style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to='/users/new' style={{ textDecoration: 'none' }} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
      className="datagrid"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
