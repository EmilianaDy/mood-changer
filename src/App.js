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
      currentWeather: 'current weather',
      weatherReady: false
    };

    this.changeConditions = this.changeConditions.bind(this);
    this.weatherDescriptionsList = ["Clear Sky", "Shower Rain", "Rain", "Few clouds", "Broken clouds", "Thunderstorm", "Snow"]
  }

  componentDidMount() {
    this.showTemperature();
  }

  changeConditions(description) {
        

        if (description === "current") {
          var currentWeather;

          // handle conditions without animation
          switch (description) {
            case "Scattered clouds":
              currentWeather = "Broken Clouds";
              break;
            case "Mist":
              currentWeather = "Broken Clouds";
              break;
            default:
              currentWeather = this.state.currentWeather;
          }
            
            this.setState({weatherConditions: currentWeather});    
        } else {
            this.setState({weatherConditions: description});    
        }
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
          var myLatt = positionObj.myLat;
          var myLonn = positionObj.myLon;
          var api = 'http://api.openweathermap.org/data/2.5/weather?';
          var myPosition = 'lat=' + myLatt + '&lon=' + myLonn + '&units=metric';
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
      {!this.state.weatherReady && 
      <Loader />
        }
      <div className="App">
        <Header />
        <AnimatedWeather weatherConditions = {this.state.weatherConditions}/>
        <CurrentWeather weatherConditions = {this.state.weatherConditions}
                        currentCity = {this.state.currentCity}
                        currentTemperature = {this.state.currentTemperature}
                        changeConditions = {this.changeConditions}
                        weatherDescriptionsList = {this.weatherDescriptionsList}
        />
      </div>
      </div>
    );
  }
}


