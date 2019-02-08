import React from 'react';
import axios from 'axios';
import Origin from 'src/Origin';
import Destination from "./Destination";
export default class App extends React.Component {
    state = {
        name: '',
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        let user = {
            name: this.state.name
        };

        axios.post(`https://sandbox.max.ng/v1/pricings/estimate`, { "origin": { "lat": Origin.lat, "lng": Origin.lng }, "destination": { "lat": Destination.lat, "lng": Destination.lng }, "service_id": "e6f9a0b7-8f03-431f-a3da-7fbc914bbb72" }
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <button type="submit">Get Price</button>
                </form>
            </div>
        )
    }
}
