import React from 'react'
import "./Mapping.css"
import damger from "./danger.jpg"
import {MapContainer,TileLayer,Circle,Popup} from "react-leaflet"
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
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
function Mapping({center,zoom,countries,mapZoom}) {
    console.log(countries)
    return (
        <div className="map">
        <ZoomOutMapIcon className="zoom" onClick={()=>mapZoom(true)}/>
           <MapContainer center={center} zoom={zoom}>
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

export default Mapping;
