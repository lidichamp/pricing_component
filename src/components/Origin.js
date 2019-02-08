import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"

const API_KEY = "lydiaapikey"
var lati;
var long;
class Origin extends React.Component {
    state = {
    search: "",
    value: "",
}

    handleInputChange(e) {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest(suggest) {

        lati=suggest.geometry.location.lat();
        long=suggest.geometry.location.lng();
        this.setState({search: "", value: suggest.formatted_address})
    }

    render() {
        const {search, value} = this.state
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
                                    placeholder="Champion Origin.."
                                    onChange={this.handleInputChange.bind(this)}
                                />
                            </ReactGooglePlacesSuggest>
                        </div>
                    )
                }
            />
        )
    }
}

Origin.propTypes = {
    googleMaps: PropTypes.object,
}
export default Origin
export { lati, long}

