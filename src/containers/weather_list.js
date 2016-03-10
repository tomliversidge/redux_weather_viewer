import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';
import SimpleLineChart from '../components/simple_line_chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component{
    renderWeather(cityData){

        const temperatures = cityData.list.map(weather => weather.main.temp - 273.15);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const { lon, lat } = cityData.city.coord;
        return (
            <tr key={cityData.city.id}>
                <td>
                    <GoogleMap
                    lon={lon}
                    lat={lat}/>
                    {cityData.city.name}</td>
                <td>
                    <SimpleLineChart data={temperatures} colour="blue" units="C"/>
                </td>
                <td>
                    <SimpleLineChart data={humidities} colour="red" units="hPa"/>
                </td>
                <td>
                    <SimpleLineChart data={pressures} colour="green" units="%"/>
                </td>
            </tr>
        )
    }

    render(){
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th>City</th>
                   <th>Temperature (C)</th>
                   <th>Pressure (hPa)</th>
                   <th>Humidity (%)</th>
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
function mapStateToProps({ weather }){
    return { weather };
}

export default connect(mapStateToProps)(WeatherList);