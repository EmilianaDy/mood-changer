import React, { Component} from 'react';
import AnimationClearSky from './AnimationClearSky'
import AnimationRain from './AnimationRain'
import AnimationClouds from './AnimationClouds'
import AnimationThunderstorm from './AnimationThunderstorm'
import AnimationSnow from './AnimationSnow'

export default class AnimatedWeather extends Component {

    provideAnimation() {      
        switch (this.props.weatherConditions.toLowerCase()) {
                  
            case "clear sky":
                return <AnimationClearSky />

            case "shower rain":
                return <AnimationRain dropsAmount="high"/>

            case "rain":
                return <AnimationRain dropsAmount="low"/>

            case "few clouds":
                return <AnimationClouds cloudDensity="low"/>

            case "broken clouds":
                return <AnimationClouds cloudDensity="high"/>
            
            case "thunderstorm":
                return <AnimationThunderstorm />

            case "snow":
                return <AnimationSnow />

            default:
                return <AnimationClearSky />
        }
    }
    
    render() {
        return (
            <div className="animation__wrapper">
                {this.provideAnimation()}
            </div>
        );
    }
}