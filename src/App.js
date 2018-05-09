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
      isCurrentWeatherShowing: true,
      weatherReady: false,
      mobileWidth: false
    };

    this.changeConditions = this.changeConditions.bind(this);
    this.weatherDescriptionsList = ["Clear sky", "Shower rain", "Rain", "Few clouds", "Broken clouds", "Thunderstorm", "Snow"];
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
        var current = this.state.currentWeather;
        var conditions;

        if (description === "current" ) {                  
          description = current;
          this.setState({isCurrentWeatherShowing: false})
        } else {          
          this.setState({weatherConditions: description})           
        }

        if (this.state.isCurrentWeatherShowing) {
          conditions = current;
        } else {
          conditions = description;
        }

        switch (description) {            
            case "Clouds":
              description = "Broken clouds";
              break;
            case "Drizzle":
              description = "Rain";
              break;
            case "Clear":
              description = "Clear Sky";
              break;
            case "Atmosphere":
              description = "Broken clouds";
              break;
            default:
              description = conditions;
        }    
       
        this.setState({weatherConditions: description});
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
                              currentWeather: data.weather[0].main,
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
          <AnimatedWeather weatherConditions = {this.state.weatherConditions}
                            weatherReady = {this.state.weatherReady}/>
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
