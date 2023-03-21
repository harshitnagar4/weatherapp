import { createSlice } from '@reduxjs/toolkit'
import { getWeather } from '../apiservice/service'


const initialState = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    humidity: undefined,
    visibility:undefined,
    weatherType: 'CLEAR_DAY',
    windSpeed:undefined,
    data:{}
}

export const locationSlice = createSlice({
  name: 'locationSlicData',
  initialState,
  reducers: {
 latHandler:(state,action)=>{
    state.lat=action.payload
 },
 lonHandler:(state,action)=>{
    state.lon=action.payload
 },
 errorMessageHandler:(state,action)=>{
    state.errorMessage=action.payload
 },
 temperatureCHandler:(state,action)=>{
    state.temperatureC=action.payload
 },
 temperatureFHandler:(state,action)=>{
    state.temperatureF=action.payload
 },
 cityHandler:(state,action)=>{
    state.city=action.payload
 },
 countryHandler:(state,action)=>{
    state.country=action.payload
 },
 sunriseHandler:(state,action)=>{
    state.sunrise=action.payload
 },
 sunsetHandler:(state,action)=>{
    state. sunset=action.payload
 },
 humidityHandler:(state,action)=>{
    state. humidity=action.payload
 },
 weatherTypeHandler:(state,action)=>{
    state.weatherType=action.payload
 },
 setData:(state,action)=>{
    state.data=action.payload
 },
 visibilityHandler:(state,action)=>{
    state. visibility=action.payload
 },
 windSpeedHandler:(state,action)=>{
    state.windSpeed=action.payload
 },
  },
  extraReducers:{
    [getWeather.fulfilled]:(state,{payload})=>{
        return {...state,data:payload}
    }
  }
})

// Action creators are generated for each case reducer function
export const { latHandler, lonHandler, errorMessageHandler, temperatureCHandler , temperatureFHandler , cityHandler , countryHandler ,  sunriseHandler , sunsetHandler , humidityHandler , weatherTypeHandler,setData,visibilityHandler ,windSpeedHandler } = locationSlice.actions

export default locationSlice.reducer