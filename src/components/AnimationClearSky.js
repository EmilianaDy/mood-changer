import React, { Component} from 'react';
import SunElement from './SunElement';
import sunbed from '../images/sunbed.svg';
import sunUmbrella from '../images/sun-umbrella.svg';

export default class AnimationClearSky extends Component {
    render() {
        return (
            <div className="clear-sky__wrapper">
            
                <SunElement />
                <img className="sunbed-image" alt="sunbed" src={sunbed}/>
                <img className="sun-umbrella-image" alt="sun-umbrella" src={sunUmbrella}/>
            </div>
        );
    }
}