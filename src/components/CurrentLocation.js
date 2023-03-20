import React, { useEffect, useState } from 'react'
import apiKeys from '../apiKeys';
import ReactAnimatedWeather from "react-animated-weather";
import Wheather from './Wheather';
const CurrentLocation = () => {

  
  const [data , setData] = useState({})
    const[lat,setLat]=useState(undefined)
    const[lon,setLon]=useState(undefined)
    const[errorMessage,setErrorMessage]=useState(undefined)
    const[temperatureC,setTemperatureC]=useState(undefined)
    const[temperatureF,setTemperatureF]=useState(undefined)
    const[city,setCity]=useState(undefined)
    const[country,setCountry]=useState(undefined)
    const[sunrise,setSunrise]=useState(undefined)
    const[sunset,setSunset]=useState(undefined)
    const[errorMsg,setErrorMsg]=useState(undefined)
    const[humidity,setHumidity]=useState(undefined);
    const[weatherType , setWeatherType] = useState('CLEAR_DAY');
    const defaults = {
        icon: `${weatherType}`,
        color: 'goldenrod',
        size: 100,
        animate: true
      };
   let getPosition = (options)=>{
        return new Promise((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(resolve,reject,options)
        })
    }
   
    useEffect(()=>{
if(data && data.coord){
    if(data.weather[0].main==="Haze"){
     setWeatherType('CLEAR_DAY')    
    }
    if(data.weather[0].main==="Clouds"){
     setWeatherType('PARTLY_CLOUDY_DAY')    
    }
    if(data.weather[0].main==="Rain"){
     setWeatherType('RAIN')    
    }
    if(data.weather[0].main==="Snow"){
     setWeatherType('SNOW')    
    }
    if(data.weather[0].main==="Fog"){
     setWeatherType('FOG')    
    }
    if(data.weather[0].main==="Smoke"){
     setWeatherType('FOG')    
    }
    if(data.weather[0].main==="Tornado"){
     setWeatherType('WIND')    
    }
    if(data.weather[0].main==="Dust"){
     setWeatherType('WIND')    
    }
    else{
     setWeatherType('CLEAR_DAY')    
    }
    setLat(lat);
     setLon(lon);
     setCity(data.name);
     setTemperatureC(Math.round(data.main.temp));
     setTemperatureF(Math.round(data.main.temp* 1.8 + 32));
     setHumidity(data.main.humidity);
     setWeatherType(data.weather[0].main);
     setCountry(data.sys.country)
    console.log(data,'data')
}
    },[data])
    useEffect(()=>{
        if (navigator.geolocation) {
             getPosition()
              //If user allow location service then will fetch data & send it to get-weather function.
              .then((position) => {
                getWeather(position.coords.latitude, position.coords.longitude);
              })
              .catch((err) => {
                //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
                this.getWeather(28.67, 77.22);
                alert(
                  "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
                );
              });
          } else {
            alert("Geolocation not available");
          }
           },[])
//    for api Data
let getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const apidata = await api_call.json();
     setData(apidata);
  };
  
  return (
<>
<ReactAnimatedWeather
                icon={weatherType}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
                  <Wheather city={city} country={country} defaults={defaults} weatherType={weatherType}/>
</>
  )
}

export default CurrentLocation