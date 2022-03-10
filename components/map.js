import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import ClickEvent from "./map-click-event";

const Map = ({ lat, long }) => {
  return (
    <MapContainer
      center={[32.7502, 114.7655]}
      zoom={0}
      style={{ height: "100%, width: 100%" }}
    >
      <TileLayer
        url={
          "https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY2hhcmJvdXIiLCJhIjoiY2wwa2hoaWh4MG1uYzNvbDR6YXc0MXU2ayJ9.HWy9Ra-O1gE_v8o3c_7LaA"
        }
        attribution={
          "Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
        }
      />
      <Marker
        title={"Drag me!"}
        position={[32.7502, 114.7655]}
        draggable={true}
        autoPan={true}
        animate={true}
      >
        <Popup>Drag me!</Popup>
      </Marker>
      <ClickEvent lat={lat} long={long} />
    </MapContainer>
  );
};

export default Map;
