import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';
import { removeCity } from '../actions/remove_city';
import SimpleLineChart from '../components/simple_line_chart';
import GoogleMap from '../components/google_map';

function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

class WeatherList extends Component {
    constructor(props){
        super(props);

        // take the existing function, and replace with a bound one
        this.renderWeather = this.renderWeather.bind(this);
    }

    removeCity(cityId){
        console.log("removing " + cityId);
        this.props.removeCity(cityId); // call the API
    }

    renderWeather(cityData) {
        const temperatures = cityData.list.map(weather => convertKelvinToCelsius(weather.main.temp));
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const windSpeeds = cityData.list.map(weather => weather.wind.speed);
        const { lon, lat } = cityData.city.coord;
        return (
            <tr key={cityData.city.id}>
                <td><span onClick={()=> this.removeCity(cityData.city.id)}>X</span></td>
                <td>{cityData.city.name}</td>
                <td>
                    <SimpleLineChart data={temperatures} colour="blue" units="C"/>
                </td>
                <td>
                    <SimpleLineChart data={pressures} colour="red" units="hPa"/>
                </td>
                <td>
                    <SimpleLineChart data={humidities} colour="green" units="%"/>
                </td>
                <td>
                    <SimpleLineChart data={windSpeeds} colour="black" units="mph"/>
                </td>
                <td>
                    <GoogleMap
                        lon={lon}
                        lat={lat}/>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Actions</th>
                    <th>City</th>
                    <th>Temperature (C)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                    <th>Wind Speed (mph)</th>
                    <th>Map</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

// give access to this.props.weather above
function mapStateToProps({ weather }) {
    return {weather};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({removeCity}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);