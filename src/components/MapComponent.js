import React from "react";
import  { GoogleMap, withGoogleMap } from "react-google-maps";

export default function MapComponent(props) {
    /**
     * withGoogleMap - initializes the map component
     */
    function Map() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={props.center}
                options={{disableDefaultUI: true}}
                onRightClick={props.onRightClick}
            />
        )
    }

    const WrappedMap = withGoogleMap(Map);

    return(
        <WrappedMap
            googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC-1_iM_0fSsAenW9hkQSGcQU36f2k8HAU"}
            loadingElement={<div style={{height: '100%'}}/>}
            containerElement={<div style={{height: '100%'}}/>}
            mapElement={<div style={{height: '100%'}}/>}
        />
    );
}
