import React from "react"
import {Doughnut} from "react-chartjs-2"
 const donutChart = {

    labels:['1 star','2 star','3 star','4 star'],
    datasets: [{
      data: [10, 50, 10,40],
      backgroundColor: [
        '#808080',
        '#808080',
        '#808080',
        '#808080'
    
        ],
        hoverBackgroundColor: [
        '#FF5733',
        '#FF5733',
        '#FF5733',
        '#FF5733'
        ],
       
        hoverBorderColor : [
          '#FF5733',
          '#FF5733',
          '#FF5733',
          '#FF5733'
          ],
    }
    ]
    }
function LineGraph() {
 
    return (
<div>
      <Doughnut 
      data={donutChart}
      options={{
          padding:"0px",
          responsive:true,
          maintainAspectRatio:true,
          defaultFontSize:"14px",
          title:{
            display:true,
            text:'Total Feedback',
            fontSize:30,
          },
          legend:{
              display:false,
          },
          plugins:{
              datalabels: {
                  color:'red',
                  anchor: "start",
                  align:"end",
   
              }
          } 
      }}
      />
      </div>
)
}
export default LineGraph;