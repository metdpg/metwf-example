import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import Forecast from "./Forecast"

// Hack to get marker icon to work
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
// Hack end

type Position = L.LatLng|null

function ForecastMarker() {
    const [position, setPosition] = useState<Position>(null)
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng)
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                <Forecast position={ position }  />
            </Popup>
        </Marker>
    )
}

export default function ForecastMap() {
    // Default coordinates set to Ethiopia.
    const position : LatLngExpression = [9.016667, 38.75];
    const zoom : number = 6;

    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
            <TileLayer
               attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ForecastMarker />
            {
                // Placeholder, we'll put our markers here
            }
        </MapContainer>
        )
};
