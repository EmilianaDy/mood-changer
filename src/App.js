import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import WeatherForecast from './components/WeatherForecast.js';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <WeatherForecast />
      </div>
    );
  }
}


