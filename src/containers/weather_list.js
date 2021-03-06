import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        console.log("cityData: ", cityData);
        const name = cityData.city.name;
        const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp-273);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        console.log(temps);
        // ES6 syntax - find coord object, grab lon and lat properties off of it, and assign to lon and lat vars
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td>
                    <Chart color="red" data={temps} units="K" />
                </td>
                <td>
                    <Chart color="blue" data={pressure} units="hPa" />
                </td>
                <td>
                    <Chart color="green" data={humidity} units="%" />
                </td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

// ES6 syntax: instead of parameter state and then using state.weather, parameter is weather { weather }
// When key & value are identical, can do { weather } instead of weather: weather
// Return state.weather (or {weather}) because we assigned weather reducer to weather key in combinedReducer
// When reducer pushes new state to component, calls this and then the state is passed into props
function mapStateToProps({weather}) {
    return { weather };
}

// Connects to redux store
// Connects component WeatherList with state mapping
// Exports connected version
export default connect(mapStateToProps)(WeatherList);