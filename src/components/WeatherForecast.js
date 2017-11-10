import React, { Component} from 'react';


export default class WeatherForecast extends Component {
    constructor() {
        super();
        this.state = {
                cracowTemperature: 'piździ'
          };
    }

    componentWillMount() { 
        fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=4335ee325906565f64956605fca2ca89')
        .then(results =>  results.json()
        ).then(data => this.setState({cracowTemperature: data.main.temp}));

        // this.setState({cracowTemperature: newTemp});
    }
    
    render() {
        return (
            <div className="weather__section">
                   {this.state.cracowTemperature}
            </div>
        );
    }
}