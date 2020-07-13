import React, { useState, useEffect, useCallback } from "react";
import  { GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import nature from "../resources/nature-black.png"
import request from "../resources/request.png"
import walking from "../resources/sport-black.png"
import photo from "../resources/photograph.png"
import hint from "../resources/attention.png"
import { getAllDiscussions } from "../services/DiscussionService"

export default function MapComponent(props) {
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const discussionCoordinates = null;
    //props.setDiscussionCoordinates;
    const [discussions, setDiscussions] = useState([]);
    const [discussionLatLng, setDiscussionLatLng] = useState(null);
    //const showDiscussion = props.showDiscussion;

    function loadAllDiscussions() {
        getAllDiscussions()
            .then((res) => {
                console.log(res);
                setDiscussions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    useEffect(() => {
       loadAllDiscussions();
    },[]);

    // topic icon chosen based on discussion topic
    function chooseTopicIcon(discussion) {
        if(discussion.topic === "Request") {
            return request;
        } else if(discussion.topic === "Nature") {
            return nature;
        } else if(discussion.topic === "Walking") {
            return walking;
        } else if(discussion.topic === "Photo") {
            return photo;
        } else if(discussion.topic === "Hint") {
            return hint;
        }
    }

    /**
     * withGoogleMap - initializes the map component
     */
    function Map() {
        console.log(discussions);
        return (
            <GoogleMap
                id="map"
                defaultZoom={14}
                defaultCenter={props.defaultCenter}
                options={{disableDefaultUI: true, zoomControl: true}}
                onDblClick={props.onDblClick}
                //props.onDblClick;
            >
                {(props.markers.length != 0) &&
                    <Marker
                        key={'${marker.lat}-${marker.lng}'}
                        position={{lat: props.markers[props.markers.length - 1].lat, lng: props.markers[props.markers.length - 1].lng}}
                        onClick={() => {
                            setSelectedDiscussion(discussionCoordinates);
                        }}
                        /*
                        icon={{
                            url: nature,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                         */
                    />
                }


                {discussions.map(discussion => (
                    <Marker
                        key={discussion._id}
                        position={{lat: discussion.lat, lng: discussion.lng}}
                        onClick={() => {
                            setSelectedDiscussion(discussion);
                            props.selectDiscussion(discussion);
                            //showDiscussion(selectedDiscussion);
                        }}
                        icon={{
                            url: chooseTopicIcon(discussion),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {selectedDiscussion && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedDiscussion(null);
                        }}
                        position={{lat: selectedDiscussion.lat, lng: selectedDiscussion.lng}}
                    >
                        <div>
                            <h2>{selectedDiscussion.title}</h2>
                            <p>{selectedDiscussion.topic}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
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
