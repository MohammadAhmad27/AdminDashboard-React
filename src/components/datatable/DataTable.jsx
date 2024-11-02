import "./datatable.scss"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";



const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchData();

    //Listen RealTime

    // let list = []; // causing object extensive error
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(updatedList);
      // setData(list); 
    }, (error) => {
      console.log(error);
    });
    return () => {
      unsubscribe();
    }
  }, [])


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);

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
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
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
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
