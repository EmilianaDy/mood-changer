import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import CurrentWeather from './components/CurrentWeather.js';
import AnimatedWeather from './components/AnimatedWeather.js';
import Loader from './components/Loader.js';

export default class App extends Component {

  constructor(props) {   
    super(props);
    this.state = {
      currentCity: "myCity",
      currentTemperature: "0",
      weatherConditions: "clear sky",
      currentWeather: "current",
      weatherReady: false,
      mobileWidth: false
    };

    this.changeConditions = this.changeConditions.bind(this);
    this.weatherDescriptionsList = ["clear sky", "shower rain", "rain", "few clouds", "broken clouds", "thunderstorm", "snow"];
  }

  componentWillMount() {
    this.isMobileView();
  }

  componentDidMount() {
    this.showTemperature();
    window.addEventListener("resize", this.isMobileView);
  }

  isMobileView = () => {
    if (window.innerWidth <= 1000) {
      this.setState({mobileWidth: true});
    } else {
      this.setState({mobileWidth: false});
    }
  }

  changeConditions(description) { 
        var weather;
        // handle conditions without animation
        switch (description) {
          case "scattered clouds":
            weather = "broken clouds";
            break;
          case "mist":
            weather = "broken Clouds";
            break;
          default:
            weather = "clear sky";
        }

        if (description === "current") {    
          weather = this.state.currentWeather;            
        } else {
          weather = description;              
        }

        this.setState({weatherConditions: weather}); 
  }

  getLocation = () => {
    return new Promise(function(resolve, reject) {
            var positionObj = {};
            navigator.geolocation.getCurrentPosition(function(position) {               
                positionObj.myLat = position.coords.latitude;
                positionObj.myLon = position.coords.longitude;
                resolve(positionObj);
        });
    });
  } 

  showTemperature = () => {
    this.getLocation()
        .then(function(positionObj) {
          var api = 'https://api.openweathermap.org/data/2.5/weather?';
          var myPosition = 'lat=' + positionObj.myLat + '&lon=' + positionObj.myLon + '&units=metric';
          var apiKey = '&APPID=4335ee325906565f64956605fca2ca89';
          var apiUrl = api + myPosition + apiKey;
              
              if ("geolocation" in navigator) {
                          fetch(apiUrl)
                          .then(function(response) {return response.json();})
                          .then(data => this.setState({
                              currentTemperature: data.main.temp,
                              currentCity: data.name,
                              currentWeather: data.weather[0].description,
                              weatherIcon: data.weather.icon,
                              weatherReady: true
                          })) 
                          .catch(function(error) {
                            console.log('error getting data from API');
                          });
              }
        }.bind(this))
        .catch(function() {
          console.log('location err');
        })
  }

  
  render() {
    return (
      <div>
        {this.state.mobileWidth && 
        <div className="mobile-view-info">
        <span>For better experience, open the app using desktop browser. Enjoy!</span>
        </div>}

        {!this.state.weatherReady && 
        <Loader />}

        {!!this.state.weatherReady && 
        <div className="App">
          <Header />
          <AnimatedWeather weatherConditions = {this.state.weatherConditions}/>
          <CurrentWeather weatherConditions = {this.state.weatherConditions}
                          currentCity = {this.state.currentCity}
                          currentTemperature = {this.state.currentTemperature}
                          changeConditions = {this.changeConditions}
                          weatherDescriptionsList = {this.weatherDescriptionsList}
          />
        </div>}

        
      </div>
    );
  }
}
