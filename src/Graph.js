import React, { useState,useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  } from 'recharts';
  import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
const Graph=({graphZoom})=>{
  const[dataG,setData]=useState()

const buildchartdata=(data)=>{
    const chartData=[]
    let lastDatapoint;
    for (let date in data.cases){
      if(lastDatapoint){
        const newDatapoint={
          name:date,
          uv:data["cases"][date]-lastDatapoint,
        }
      chartData.push(newDatapoint)
      }
      lastDatapoint=data["cases"][date]
    }
    return chartData;
    }
useEffect(()=>{
  const fetchData=async ()=>{
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
    .then(res=>res.json())
    .then(data=>{
      const chart=buildchartdata(data)
      setData(chart)
      console.log("x",chart)
    })
  }

fetchData();
},[]);

    return (
        <div style={{ width: '100%', height: 300 }} className="graph" onClick={()=>graphZoom(true)}>
       <ZoomOutMapIcon className="zoom"/>
        <ResponsiveContainer>
          <AreaChart
            data={dataG}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      );
    
}


export default Graph;
   

