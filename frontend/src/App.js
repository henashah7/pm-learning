import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { Helmet } from "react-helmet";
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import UploadIcon from '@mui/icons-material/Upload';
import { AgChartsReact } from 'ag-charts-react';
import GenerateChart from './generateChart';
import UploadCsv from './uploadCsv';

function App() {

  const submit = () => {
    Axios.post("http//localhost:3000/api/uploadfile").then(() => {
      console.log("returned from post api");
      alert("Succesfully added");
    });
  }

  return (
    <div className="App">
      <Helmet>
        <title>My PM LEARNING APP</title>
        <link rel="canonical" href="http://example.com"/>
        <meta name="sample app" content="sample app, time spend" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
      </Helmet>
      <header className="App-header"> 
        <h1>
          How am I using my time? 
        </h1>
      </header>
      <UploadCsv />
      {/* <div className="form">
        <form action="/uploadfile" enctype="multipart/form-data" method="post">
          <input type="file" name="uploadfile" accept='csv'/>
          <Button variant="contained" startIcon={<UploadIcon/>} onClick={submit}> Upload Task CSV</Button>
        </form>  
      </div> */}
      <div classname="chart-grid">
        <GenerateChart/>
      </div>
    </div>
  );
}
export default App;
