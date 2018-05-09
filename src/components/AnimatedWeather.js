import React, { Component} from 'react';
import AnimationClearSky from './AnimationClearSky'
import AnimationRain from './AnimationRain'
import AnimationClouds from './AnimationClouds'
import AnimationThunderstorm from './AnimationThunderstorm'
import AnimationSnow from './AnimationSnow'

export default class AnimatedWeather extends Component {

    provideAnimation() {      
        if (!!this.props.weatherReady) {
            switch (this.props.weatherConditions) {                 
                case "Clear sky":
                    return <AnimationClearSky />

                case "Shower rain":
                    return <AnimationRain dropsAmount="high"/>

                case "Rain":
                    return <AnimationRain dropsAmount="low"/>

                case "Few clouds":
                    return <AnimationClouds cloudDensity="low"/>

                case "Broken clouds":
                    return <AnimationClouds cloudDensity="high"/>
                
                case "Thunderstorm":
                    return <AnimationThunderstorm />

                case "Snow":
                    return <AnimationSnow />

                default:
                    return <AnimationClearSky />
            }
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