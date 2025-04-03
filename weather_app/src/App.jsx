import { useEffect, useState } from 'react'
import Globe from 'react-globe.gl';
import React from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_APP_API;

function GlobeComponent({coords, setCoords}) {
  return(
    // position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 | Moves the globe to the background
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}>
      <Globe
          globeImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Large_World_Topo_Map_1.png/1280px-Large_World_Topo_Map_1.png"
          onGlobeClick={({ lat, lng }) => setCoords({ lat, lon: lng })}
          onGlobeMove={({ lat, lng }) => setCoords({ lat, lon: lng })}
          />
          <div style={{ position: "absolute", top: 10, left: 10 }}>
      </div>
    </div>
  )
}

function App() {

  const [coords, setCoords] = useState({lat:0, lon:0})

  const [city, setCity] = useState({});
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()

  useEffect(() =>{
    if(latitude && longitude){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
      .then(response => {setCity(response.data)})
      .catch(error => {console.log(error)})
    }
  },[latitude, longitude]);


  useEffect(()=>{
    setLatitude(coords.lat)
    setLongitude(coords.lon)
  })

  const searchCountry = (e) => {
    const value = parseFloat(e.target.value)
    if (e.target.id === 'longitude') {
      setLongitude(value);
    } else if (e.target.id === 'latitude') {
      setLatitude(value);
    }
  }

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <h1>Weather app</h1>
        <p>Longitude: <input id="longitude" type="text" onChange={searchCountry}></input></p>
        <p>Latitude: <input id="latitude" type="text" onChange={searchCountry}></input></p>
        <p>City:{city.name}</p>
        <p>Temperature: {city.main?.temp}</p>
        <p>Weather: {city.weather?.[0]?.description}</p>
        <p>Wind: {city.wind?.speed}</p>
      </div>
      <div>
        <GlobeComponent coords={coords} setCoords={setCoords}/>
      </div>
    </>
  )
}

export default App
