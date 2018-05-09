import React, { Component} from 'react';
import Button from './Button';
import Dropdown from './Dropdown';


export default class CurrentWeather extends Component {
    constructor(props) { 
        super(props);
        this.handleCurrentWeatherAction = this.handleCurrentWeatherAction.bind(this);
        this.handleChangeWeatherMouseEnter = this.handleChangeWeatherMouseEnter.bind(this);
        this.handleChangeWeatherMouseLeave = this.handleChangeWeatherMouseLeave.bind(this);
        this.handleWeatherPick = this.handleWeatherPick.bind(this);
        this.dropdown = null;
        this.state = {
            dropdownOpened: false
        }
    }

    componentDidMount = () => {
        this.props.changeConditions("current");
    }

    handleCurrentWeatherAction = () => {
        this.props.changeConditions("current");
        this.weatherSection.style.opacity =  "1";
    }

    handleChangeWeatherMouseEnter = () => {
        var dropdownList = this.props.weatherDescriptionsList;

        this.setState({dropdownOpened: true});
        this.dropdown = dropdownList.map((weather, id) => 
             <p key={id} onClick={() => {this.handleWeatherPick(weather)}}>{weather}</p>
        );   
    }

    handleChangeWeatherMouseLeave = () => {
        if (this.state.dropdownOpened) {
            this.setState({dropdownOpened: false});
             return <div>{this.dropdown}</div>;
        }    
    }

    handleWeatherPick = (weather) => {
        this.props.changeConditions(weather);
        this.setState({dropdownOpened: false});
        this.weatherSection.style.opacity =  "0";
    }

    render() {
        var opacityValue = 0;
        
        if (this.state.dropdownOpened) {
            opacityValue = 1;
        }

        var dropdownOpacity = {
            opacity: opacityValue
        }

        return (
            <div className="weather__wrapper">
                <div className="weather__section" ref={(weatherSection) => { this.weatherSection = weatherSection; }}>

                    <div className="weather__temperature">
                    {Math.round(this.props.currentTemperature)} &#176;C
                    </div>

                    <div className="weather__city">
                    I can see you are in <span className="weather__city-details">{this.props.currentCity}</span> now
                    </div>

                    <div className="weather__description">
                        <span>Outside the window you see: </span>
                        <span className="weather__description-details">{this.props.weatherConditions}</span>                   
                    </div>
                    
                </div>
                
                <div className="buttons__section">
                    <div className="Button__pick-mood">
                        <Dropdown onMouseEnter={this.handleChangeWeatherMouseEnter} onMouseLeave={this.handleChangeWeatherMouseLeave} buttonText="Pick your own"/>
                    </div>
                    <div className="dropdown" style={dropdownOpacity} onMouseEnter={this.handleChangeWeatherMouseEnter} onMouseLeave={this.handleChangeWeatherMouseLeave}>{this.dropdown}</div>
                    <div className="Button__change-mood">
                        <Button onClick={this.handleCurrentWeatherAction} buttonText="Show current weather"/>
                    </div>  
                    <div className="copyrights">
                    <p>© 2018 Emilana Guzik</p>
                    <p>Icons made by <a href="http://.flaticon.com">Freepik</a></p>
                    </div>
                </div>
            </div>
        );
    }
}