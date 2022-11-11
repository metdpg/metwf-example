import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import ForecastGraph from "./ForecastGraph";

// Hack to get marker icon to work
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React from "react";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
// Hack end

type Position = L.LatLng|null

function ForecastPosition() {
    const [position, setPosition] = useState<Position>(null)
    
    useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
    })

    return position === null ? null : (
            <Popup maxWidth={4000} position={ position } >
                <div style={{ width: "70vw" }}>
                    <ForecastGraph position={ position }  /> 
                </div>
            </Popup>           
    )
}

export default function ForecastMap() {
    // Default coordinates set to Ethiopia.
    const position : LatLngExpression = [9.016667, 38.75];
    const zoom : number = 7;

    const style = {
        height: 'calc(100vh - 100px)',
        marginBottom: '10px'
    }
    
    return (
        <MapContainer style={style} center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
               attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ForecastPosition />
        </MapContainer>
        )
};
