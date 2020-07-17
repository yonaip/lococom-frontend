import React, { useState, useEffect } from "react";
import  { GoogleMap, withGoogleMap, Marker } from "react-google-maps";
import nature from "../resources/nature_marker.svg"
import request from "../resources/request_marker.svg"
import walking from "../resources/walking_marker.svg"
import photo from "../resources/photo_marker.svg"
import hint from "../resources/attention_marker.svg"
import marker from "../resources/marker.svg"
import natureRed from "../resources/nature_red_marker.svg"
import requestRed from "../resources/request_red_marker.svg"
import walkingRed from "../resources/walking_red_marker.svg"
import photoRed from "../resources/photo_red_marker.svg"
import hintRed from "../resources/attention_red_marker.svg"
import discussionMarkers from './DiscussionMarkers';
import supercluster from "points-cluster";
import {markersData} from "./MarkersData";

export default function MapComponent(props) {
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedDiscussion(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };

    }, []);

    // topic icon chosen based on discussion topic
    function chooseTopicIcon(discussion) {
        if(discussion.topic === "Request") {
            if(discussion === selectedDiscussion) {
                return requestRed;
            }
            return request;
        } else if(discussion.topic === "Nature") {
            if(discussion === selectedDiscussion) {
                return natureRed;
            }
            return nature;
        } else if(discussion.topic === "Walking") {
            if(discussion === selectedDiscussion) {
                return walkingRed;
            }
            return walking;
        } else if(discussion.topic === "Photo") {
            if(discussion === selectedDiscussion) {
                return photoRed;
            }
            return photo;
        } else if(discussion.topic === "Hint") {
            if(discussion === selectedDiscussion) {
                return hintRed;
            }
            return hint;
        }
    }

    const [mapOptions, setMapOptions] = useState({center: props.center, zoom: 14});
    const [clusters, setCluster] = useState([]);

    useEffect(() => createClusters(mapOptions), [mapOptions]);

    const getClusters = () => {
        const output = supercluster(markersData, {
            minZoom: 0,
            maxZoom: 16,
            radius: 60,
        });
        return output(mapOptions);
    };

    const createClusters = (props) => {
        console.log(mapOptions.bounds);
        if(mapOptions.bounds) {
            setCluster(getClusters(props).map(({wx, wy, numPoints, points}) => ({
                lat: wy, lng: wx, numPoints, id: `${numPoints}_${points[0].id}`, points,
            })));
        } else {
            setCluster([]);
        }
    };

    let mapRef;

    /**
     * withGoogleMap - initializes the map component
     */
    function Map() {
        //console.log(props.discussions);
        return (
            <GoogleMap
                id="map"
                defaultZoom={14}
                defaultCenter={props.defaultCenter}
                options={{disableDefaultUI: true, zoomControl: true}}
                onDblClick={props.onDblClick}
                ref={(ref) => mapRef = ref}
                onCenterChanged={printPos}
            >
                {(props.markers.length !== 0) && (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{lat: props.markers[props.markers.length - 1].lat, lng: props.markers[props.markers.length - 1].lng}}
                        icon={{
                            url: marker,
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                )}


                {props.discussions.map(discussion => (
                    <Marker
                        key={discussion._id}
                        position={{lat: discussion.lat, lng: discussion.lng}}
                        onClick={() => {
                            setSelectedDiscussion(discussion);
                            props.selectDiscussion(discussion);
                        }}
                        icon={{
                            url: chooseTopicIcon(discussion),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}


                {selectedDiscussion && (
                   <Marker
                       key={selectedDiscussion._id}
                       position={{lat: selectedDiscussion.lat, lng: selectedDiscussion.lng}}
                       icon={{
                           url: chooseTopicIcon(selectedDiscussion),
                           scaledSize: new window.google.maps.Size(40, 40),
                       }}
                   />
                )}
            </GoogleMap>
        )
    }

    function printPos() {
        console.log("Here I am! Doing SEBA again!")
        console.log(mapRef);
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
