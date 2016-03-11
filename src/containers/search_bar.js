import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/fetch_weather';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = { term : "" };

        // take the existing function, and replace with a bound one
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        // the 'this' reference below needs binding in the ctor above
        this.setState({term: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term); // call the API
        this.setState({ term : ''}); // reset the user input
    }

    render(){
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Get a 5 day forecast in your favourite city"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}/>

                <span className="input-group-btn">
                <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchWeather}, dispatch);
}
// null because there is no state to pass
export default connect(null, mapDispatchToProps)(SearchBar);