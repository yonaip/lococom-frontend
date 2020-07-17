import React, { useState, useEffect } from "react";
import { getAllDiscussions } from "../services/DiscussionService";

export default function DiscussionMarkers() {
    const [discussionMarkers, setDiscussionMarkers] = useState([]);

    function loadAllDiscussions() {
        getAllDiscussions()
            .then((res) => {
                console.log(res);
                setDiscussionMarkers(res.data.map((data) => ({
                    id: data._id,
                    lat: data.lat,
                    lng: data.lng
                })));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => loadAllDiscussions);

    return discussionMarkers;
}