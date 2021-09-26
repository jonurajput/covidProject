import React, { useState, useEffect } from 'react';
import './App.css';
import InfoBox from "./InfoBox"
import Table from "./Table"
import { sortData } from "./util"
import Mapping from "./Mapping"
import 'leaflet/dist/leaflet.css'
import Graph from "./Graph"
import Graph1 from "./Graph1"
import Map1 from "./Map1"
import { Card, CardContent } from "@material-ui/core"
import { FormControl, MenuItem, Select } from "@material-ui/core"
function App() {
  const [countries, setCountries] = useState(['INDIA', 'USA', 'UK']);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796
  });
  const [mapZoom, setZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [zoommap, setZoomMap] = useState(false)
  const [zoomgraph, setZoomGraph] = useState(false)
  //https://disease.sh/v3/covid-19/countries

  useState(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => setCountryInfo(data))
  }, [])
  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          setCountries(countries);
          const sorted = sortData(data)
          setMapCountries(data)

          setTableData(sorted);
        })
    }
    getCountryData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode);
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setZoom(10);
      })

  }
  return (
    <div className="app">
      {zoommap ? <Map1
        center={mapCenter}
        zoom={mapZoom}
        countries={mapCountries}
        mapZoom={setZoomMap}
        mapZoom={setZoomMap}
        /> : ""}
        {zoomgraph ? <Graph1
          graphZoom={setZoomGraph}
        />:""}
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Mapping
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          mapZoom={setZoomMap}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          <Graph graphZoom={setZoomGraph}/>
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
