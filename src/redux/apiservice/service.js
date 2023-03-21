import apiKeys from "../../apiKeys";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const  getWeather = createAsyncThunk('location/apiData' , async (latlonData) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${latlonData.lat}&lon=${latlonData.lon}&units=metric&APPID=${apiKeys.key}`
    );
    const apidata = await api_call.json();
     return apidata
  })