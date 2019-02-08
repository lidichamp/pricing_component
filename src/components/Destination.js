import PropTypes from "prop-types"
import React from "react"
import axios from 'axios';
import { lati, long } from './Origin'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
const API_KEY = "lydiaapikey"
var cost;
class Destination extends React.Component {

    state = {
        search: "",
        value: "",
        cost:""
    }
    lat;
    lng;
    handleInputChange(e) {
        this.setState({search: e.target.value, value: e.target.value,cost:e.target.cost})
    }

    handleSelectSuggest(suggest) {
        this.lat=suggest.geometry.location.lat();
        this.lng=suggest.geometry.location.lng();
        this.setState({search: "", value: suggest.formatted_address,cost:""})
    }
    handleSubmit = event => {
        event.preventDefault();
        var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'pk_61328014f38fd40be81747adb49537df12309c9fdfbc0486b0f2e5457d886b58'
            };
        var data = {
            "origin": {"lat":lati, "lng":long},
            "destination": {"lat": this.lat, "lng": this.lng},
            "service_id": "e6f9a0b7-8f03-431f-a3da-7fbc914bbb72"};
        axios.post(`https://sandbox.max.ng/v1/pricings/estimate`,data, {headers: headers}
            )
            .then(res => {
                console.log(res);
                console.log(res.data.data.delivery_fee);
                this.setState({search: "", value:"",cost: "Your delivery cost is ₦"+ res.data.data.delivery_fee})
            })
    }
    render() {
        const {search, value,cost} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: API_KEY,
                    libraries: "places,geocode",
                    componentRestrictions: {country: "ng"},
                    strictBounds: true,
                }}
                render={googleMaps =>
                    googleMaps && (
                        <div>
                            <ReactGooglePlacesSuggest
                                autocompletionRequest={{input: search}}
                                googleMaps={googleMaps}
                                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                            >
                                <input
                                    type="text"
                                    value={value}
                                    placeholder="Champion Destination.."
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </ReactGooglePlacesSuggest>
                            <div>
                                <form onSubmit={this.handleSubmit}>
                                    <br/>
                                    <button type="submit" className="button">Get Price</button>
                                </form>
                                <p className="lead">{cost}</p>

                            </div>
                        </div>

                    )
                }
            />
        )
    }
}

Destination.propTypes = {
    googleMaps: PropTypes.object,
}

export default Destination
export {cost};