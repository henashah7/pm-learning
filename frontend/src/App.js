import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import { AgChartsReact } from 'ag-charts-react';

function App() {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    autoSize: true,
    title: {
      text: 'Time Allocation  ',
    },
    subtitle: {
      text: "by urgency and importance of tasks",
    },
    series: [
      {
        type: 'scatter',
        title: 'Task',
        xKey: 'urgency',
        yKey: 'importance',
        sizeKey: 'urgency',
        marker: {
          size: 6,
          maxSize: 30,
          fill: 'rgba(123,145,222,0.71)',
          stroke: '#56659b',
        }
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Urgency',
        },
        label: {
          rotation: 45,
          formatter: (params) => {
            return params.value + ' points';
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Importance',
        },
        label: {
          formatter: (params) => {
            return params.value + ' points';
          },
        },
      },
    ],
    scales: {
        y: {
          beginAtZero: true,
        },
      },
    data: data,
  });

  const getChart = () => {
    console.log("inside getChart function");
    Axios.get("http://3.144.115.110/api/chart").then((results) => {
      alert("succesfully retrieved inside getChart function");
      console.log(results);
      setData(results.data); //not sure if this line of code makes sense
      options.data = results.data;
    });
  }

  const submit = () => {
    Axios.post("https://3.144.115.110/api/uploadfile").then(() => {
      console.log("returned from post api");
      alert("Succesfully added");
    });
  }

  return (
    <div className="App">
      <header className="App-header"> 
        <h1>
          How am I using my time? 
        </h1>
      </header>
      <div className="form">
        <form action="/uploadfile" enctype="multipart/form-data" method="post">
          <input type="file" name="uploadfile" accept='csv'/>
          <button onClick={submit}> Upload Task CSV</button>
        </form>  
      </div>
      <div>
        <button onClick={getChart}> Generate Eisenhower Matrix</button>
      </div>
      {console.log("inside app")}
      <AgChartsReact classname='chart' options={options}></AgChartsReact>
    </div>
  );
}
export default App;
