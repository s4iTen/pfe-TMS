import React, { useEffect, useState } from "react";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import "leaflet/dist/leaflet.css";

const Map = ({ coordinates }) => {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="map"
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.map((rent, index) => (
          <Marker position={[rent.lat, rent.lon]} key={index}></Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {

  useMapEvent({
    click: (e) => {

    },
  });
  return null;
}

export default Map;
