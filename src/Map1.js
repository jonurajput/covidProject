import React from 'react'
import "./Map1.css"
import {MapContainer,TileLayer,Circle,Popup} from "react-leaflet"
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import damger from "./danger.jpg"
const casesTypesColors={
    cases:{
        hex:"#CC1034",
        multiplier:400,
    },
    recovered:{
        hex:"#7dd71d",
      multiplier:1200,
    },
    deaths:{
        hex:"#fb4443",
        multiplier:2000,
    }
};
function Map1({center,zoom,countries,mapZoom}) {
    console.log(countries)
    return (
        <div className="map1">
        <ZoomOutMapIcon className="zoom1" onClick={()=>mapZoom(false)}/>
           <MapContainer center={center} zoom={zoom} style={{zIndex:250}}>
               <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               />
               {
                   countries.map(data=>(
                        <Circle
                        center={[data.countryInfo.lat,data.countryInfo.long]}
                        color={casesTypesColors.cases.hex}
                        fillColor={casesTypesColors.cases.hex}
                        radius={
                      Math.sqrt(data.cases)*casesTypesColors.cases.multiplier
                         }>
                         <Popup>
                         <div><img className="danger" src={damger}/></div>
                             <div>Total:{data.cases}</div>
                             <div>active:{data.active}</div>
                             <div>recovered:{data.recovered}</div>
                             <div>death:{data.deaths}</div>
                             <div>Country:{data.country}</div>
                         </Popup>
                        </Circle>

                   ))
               }
           </MapContainer> 
        </div>
    )
}

export default Map1;
