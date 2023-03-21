import React, { useEffect, useState } from 'react'
import apiKeys from '../apiKeys';
import ReactAnimatedWeather from "react-animated-weather";
import Wheather from './Wheather';
import { useDispatch, useSelector } from 'react-redux';
import {latHandler , lonHandler , errorMessageHandler , temperatureCHandler , temperatureFHandler , cityHandler , countryHandler , sunriseHandler , sunsetHandler , humidityHandler , weatherTypeHandler ,setData, visibilityHandler, windSpeedHandler} from '../redux/location/Location'
import { getWeather } from '../redux/apiservice/service';
const CurrentLocation = () => {
  const dispatch = useDispatch()

 const lat = useSelector((state)=>state.locationSlicData.lat);
 const data = useSelector((state)=>state.locationSlicData.data);
 const weatherType = useSelector((state)=>state.locationSlicData.weatherType);
 console.log(data,'data')

   let getPosition = (options)=>{
        return new Promise((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(resolve,reject,options)
        })
    }
   
    useEffect(()=>{
if(data && data.coord){
    if(data.weather[0].main==="Haze"){
     dispatch(weatherTypeHandler('CLEAR_DAY'))   
    }
    else if(data.weather[0].main==="Clouds"){
     dispatch(weatherTypeHandler('PARTLY_CLOUDY_DAY'))    
    }
    else if(data.weather[0].main==="Rain"){
     dispatch(weatherTypeHandler('RAIN') )  
    }
   else  if(data.weather[0].main==="Mist"){
     dispatch(weatherTypeHandler('SNOW'))    
    }
    else if(data.weather[0].main==="Fog"){
     dispatch(weatherTypeHandler('FOG'))    
    }
    else if(data.weather[0].main==="Smoke"){
     dispatch(weatherTypeHandler('FOG') )   
    }
   else if(data.weather[0].main==="Tornado"){
     dispatch(weatherTypeHandler('WIND'))    
    }
    else if(data.weather[0].main==="Dust"){
     dispatch(weatherTypeHandler('WIND'))    
    }
    // else{
    //  dispatch(weatherTypeHandler('CLEAR_DAY'))    
    // }
     dispatch(cityHandler(data.name));
     dispatch(temperatureCHandler(Math.round(data.main.temp)));
     dispatch(temperatureFHandler(Math.round(data.main.temp* 1.8 + 32)));
    dispatch(humidityHandler(data.main.humidity));
    dispatch(weatherTypeHandler(data.weather[0].main));
    dispatch(countryHandler(data.sys.country));
    dispatch(visibilityHandler(data.visibility));
    dispatch(windSpeedHandler(data.wind.speed))
    console.log(data,'data')
}
    },[data])
    useEffect(()=>{
        if (navigator.geolocation) {
             getPosition()
              //If user allow location service then will fetch data & send it to get-weather function.
              .then((position) => {
              let latlonData = {lat:position.coords.latitude,lon:position.coords.longitude}
               dispatch(getWeather(latlonData));
               dispatch(latHandler(position.coords.latitude))
               dispatch(lonHandler(position.coords.longitude))
              })
              .catch((err) => {
                //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
                getWeather(28.67, 77.22);
                alert(
                  "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
                );
              });
          } else {
            alert("Geolocation not available");
          }
           },[])
  
  return (
<>
  <Wheather/>
</>
  )
}

export default CurrentLocation