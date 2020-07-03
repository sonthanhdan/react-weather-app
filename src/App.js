import React, { useState, useEffect } from 'react';
import { api, days, forcasts, months } from './config'

const getForcastsByMain = (id) => {
  return forcasts.find( forcast => forcast.id === id)
}




function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather ] = useState({});
  const [active, setActive] = useState('');
 
  const buildUrlParams = (obj) => {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }

  const fetchWeather = (q) => {

    const params = buildUrlParams({
      appid: api.key,
      q: q,
      lang: 'vi',
      units : 'metric'
    })
    
    const url = `${api.baseURL}weather?${params}`;
    console.log(url)
    return fetch(url)
      .then(response => response.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
  }
  useEffect(() => {
    // Update the document title using the browser API
    // setQuery('ho chi minh')
    // fetchWeather(query)
  
  });

  const search = (event) => {
    if (event.key === 'Enter') fetchWeather(query)
  }

  const renderDate = (d) => {
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }


  const renderIcon = (id) => {
    let icon = getForcastsByMain(id);
    return icon !== 'undefined' && icon.icon ? icon.icon : '';
  }

  const handleClick = () => {
    let value =  document.querySelector('.search-input').value
    setQuery(value);
    fetchWeather(query)
  }


  
  useEffect(() => {
    fetchWeather('ho chi minh')
  }, [])
 

  return (
    <div className="app">
        <header>
            <div className="search-box">
              <div className="search-bar">
                <h2 className="search-title">Search your location</h2>
                <div className="search-input-group">
                <input className="search-input" type="search" 
                  name="query" 
                  value={query} 
                  placeholder="Find your city"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={ event => setQuery(event.target.value)}
                  onKeyPress={search}
                  onFocus={() => setActive('active')}
                  onBlur={() => setActive('')}
                
                />
                <button onClick={handleClick}>Search</button>
                </div>
              
              </div>
              <div className={'search-results'}>
                <ul>
                  <li className="search-item">
                      <a href="" >
                        <div className="search-item-inner">
                          <span className="pe-7w-rain-alt pe-2x pe-va white"></span>
                          <h3 className="location">Cau ke, Tra Vinh, Viet nam</h3>
                        </div>
                      </a>
                  </li>
                  <li className="search-item">
                      <a href="" >
                        <div className="search-item-inner">
                          <span className="pe-7w-rain-alt pe-2x pe-va white"></span>
                          <h3 className="location">Cau ke, Tra Vinh, Viet nam</h3>
                        </div>
                      </a>
                  </li>
                  <li className="search-item">
                      <a href="" >
                        <div className="search-item-inner">
                          <span className="pe-7w-rain-alt pe-2x pe-va white"></span>
                          <h3 className="location">Cau ke, Tra Vinh, Viet nam</h3>
                        </div>
                      </a>
                  </li>
                </ul>
              </div>
            </div>
        </header>
        <main>
          { (typeof weather.main != "undefined") ? (
            <div className="box-weather">
              <div className="box-weather-inner">
                <h2 className="date">{renderDate(new Date())}</h2>
                <h1 className="location">
                {weather.name}, {weather.sys.country}
                </h1>
                <div className="temprature">
                <div className="box-icon">
                  <span className={renderIcon(weather.weather[0].id) + ' pe-5x pe-va white font-size-10em'}></span>
                </div>
                <div className="box-temp">
                  <span className="temp"> {Math.round(weather.main.temp)} <i className="pe-7w-degree-celcius pe-1x pe-va white"></i></span>
                  <span className="focast">{weather.weather[0].description}</span>
                </div>
              </div>
              </div>
             
            </div>
          ) : (
            <div className="box-weather">
              <div className="box-weather-inner default-height">
                <span className="white">Not found</span>
              </div>
            </div>
          ) }
        </main>
       
    </div>
  );
}

export default App;
