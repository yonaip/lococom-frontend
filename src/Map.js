import React from "react";
import  { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: 48.137154, lng: 11.576124}}
        />
    );
}

/* withScriptjs - loads the Google Maps Javascript API v3
   withGoogleMap - initializes the map component
*/
const MapComponent = withScriptjs(withGoogleMap(Map));

export const MapWrapper =
    <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC-1_iM_0fSsAenW9hkQSGcQU36f2k8HAU"
        loadingElement={<div style={{height: '100%'}}/>}
        containerElement={<div style={{height: '100%'}}/>}
        mapElement={<div style={{height: '100%'}}/>}
    />
