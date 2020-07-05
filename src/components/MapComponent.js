import React from "react";
import  { GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as places from "../resources/testPlaces.json"
import nature from "../resources/nature-black.png"

export default function MapComponent(props) {
    const [selectedPlace, setSelectedPlace] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    React.useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedPlace(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    /**
     * withGoogleMap - initializes the map component
     */
    function Map() {
        return React.useMemo(() => {
            return (
                <GoogleMap
                    id="map"
                    defaultZoom={14}
                    defaultCenter={props.defaultCenter}
                    options={{disableDefaultUI: true, zoomControl: true}}
                    onDblClick={props.onDblClick}
                    onClick={onMapClick}
                >
                    {markers.map(marker => (
                        <Marker
                            key={'${marker.lat}-${marker.lng}'}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => {
                                setSelectedPlace(marker);
                            }}
                            icon={{
                                url: nature,
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}

                    {places.Munich.map(marker => (
                        <Marker
                            key={'${marker.lat}-${marker.lng}'}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => {
                                setSelectedPlace(marker);
                            }}
                            icon={{
                                url: nature,
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />
                    ))}

                    {selectedPlace && (
                        <InfoWindow
                            onCloseClick={() => {
                                setSelectedPlace(null);
                            }}
                            position={{lat: selectedPlace.lat, lng: selectedPlace.lng}}
                        >
                            <div>
                                <h2>{'New discussion'}</h2>
                                <p>{'hiking app'}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )
        }, [props.defaultCenter])
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
