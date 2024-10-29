import "./datatable.scss"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { userColumns, userRows } from "../../datatablesource";


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
                  <div className="viewButton">View</div>
                <div className="deleteButton">Delete</div>
              </div>
            );
          },
        },
      ];

    return (
        <div className="datatable">
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
