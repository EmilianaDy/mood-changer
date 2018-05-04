import React, { Component} from 'react';
import CloudElement from './CloudElement';
import animal from '../images/animal.svg'


export default class AnimationThunderstorm extends Component {
    render() {
        return (
            <div className="thunderstorm__wrapper">
                <div className="thunderstorm__cloud-1">
                    <CloudElement />
                </div>
                <div className="thunderstorm__cloud-2">
                    <CloudElement />
                </div>
                <div className="thunderstorm__cloud-3">
                    <CloudElement />
                </div>
                <div className="thunder-1-wrapper">
                    <div className="thunder-element-1"></div>
                    <div className="thunder-element-2"></div>
                    <div className="thunder-element-3"></div>
                </div>
                <img className="animal-image" src={animal} alt="animal"/>
                </div>
        );
    }
}