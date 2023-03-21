import React, { useEffect, useState } from 'react'
import Clock from "react-live-clock";
import bg1 from '../assets/images/bg1.jpg'
import bg from '../assets/images/bg.jpg';
import ReactAnimatedWeather from "react-animated-weather";
import apiKeys from '../apiKeys';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/location/Location';
const Wheather = () => {
  const weatherType = useSelector((state) => state.locationSlicData.weatherType)
  const city = useSelector((state) => state.locationSlicData.city)
  const country = useSelector((state) => state.locationSlicData.country)
  const humidity = useSelector((state) => state.locationSlicData.humidity)
  const temperatureC = useSelector((state) => state.locationSlicData.temperatureC)
  const visibility = useSelector((state) => state.locationSlicData.visibility)
  const windSpeed = useSelector((state) => state.locationSlicData.windSpeed)
  const dispatch = useDispatch()
  const defaults = {
    icon: `${weatherType}`,
    color: 'goldenrod',
    size: 100,
    animate: true
  };
  const [dayData, setDayData] = useState("");
  const [searchValue, setSearchValue] = useState("")
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return setDayData(`${day}, ${date} ${month} ${year}`);
  };
  const formHandler = async (e) => {
    e.preventDefault();
    let url = `${apiKeys.base}weather?q=${searchValue}&units=metric&APPID=${apiKeys.key}`;
    let fetchUrl = await fetch(url);
    let fetchData = await fetchUrl.json();
    dispatch(setData(fetchData))
  }

  useEffect(() => {
    dateBuilder(new Date())
  }, [])


  return (
    <>
      <div className='container d-flex vh-100 '>
        <div className='row d-flex justify-content-center w-100 align-items-center' >
          <div className='col-md-5 bg-secondary' style={{ height: "600px", position: "relative" }}>
            <img src={bg1} height="600px" width='540px' style={{ marginLeft: "-10px" }} />
            <div className="text-light" >
              <h1 style={{ position: "absolute", top: '10px', fontSize: "3rem", right: " 40px" }}>{city}</h1>
              <h4 style={{ position: "absolute", top: '65px', fontSize: "2rem", right: " 40px" }}>{country}</h4>
            </div>
            <div style={{ position: "absolute", bottom: '10px', fontSize: "4rem" }} className="text-light">
              <Clock format={'HH:mm:ss'} ticking={true} />
              <h3>{dayData}</h3>
            </div>
          </div>
          <div className='col-md-3 ' style={{ height: "600px", position: "relative" }}>
            <img src={bg} width="100%" height="100%" style={{ position: "absolute", left: 0 }} />
            <div style={{ position: "absolute", top: '50px' }} className="text-light">
              <ReactAnimatedWeather
                icon={defaults.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <h1 className='border-bottom'>{weatherType}</h1>
              <form className="d-flex mb-4" role="search" onSubmit={formHandler} >
                <input className="form-control me-2 border-0" type="search" placeholder="Search" aria-label="Search" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <h3 className='border-bottom mb-4'>Temprature <span className='mx-4'>{temperatureC}</span>   </h3>
              <h3 className='border-bottom mb-4'>Humidity   <span className='mx-4'>{humidity}%   </span>  </h3>
              <h3 className='border-bottom mb-4'>Visibility <span className='mx-4'>{visibility}  </span>    </h3>
              <h3 className='border-bottom mb-4'>Wind Speed <span className='mx-4'>{windSpeed}   </span>  </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Wheather