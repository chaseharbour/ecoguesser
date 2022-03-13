import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { useState, useEffect } from "react";
import ClickEvent from "./map-click-event";
import MoveableMarker from "./map-moveable-marker";
import Button from "./button";
import DistancePopup from "./map-distance-popup";

const Map = ({ lat, long }) => {
  const [mapMarkerMoved, setMapMarkerMoved] = useState(false);
  const [userClickLatLong, setUserClickLatLong] = useState({
    lat: 0,
    lng: 0,
  });
  const [gameState, setGameState] = useState(true);
  const [buttonState, setButtonState] = useState(mapMarkerMoved && gameState);

  useEffect(() => {
    setButtonState(mapMarkerMoved && gameState);
  }, [gameState, mapMarkerMoved]);

  //Handles activation of the end game button only after the map marker has been moved once.
  const handleMapClicked = () => {
    mapMarkerMoved ? null : setMapMarkerMoved(true);
  };

  const handleUpdateLatLong = (latLong) => {
    setUserClickLatLong({ lat: latLong.lat, lng: latLong.lng });
  };

  //Handles then ending of the current game when button is clicked.
  const handleButtonClicked = () => {
    if (gameState) {
      setGameState(false);
      console.log(`Game state set to: ${gameState}`);
    }
    return;
  };

  return (
    <>
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
        {/* <Marker
        title={"Drag me!"}
        position={[32.7502, 114.7655]}
        draggable={true}
        autoPan={true}
        animate={true}
        eventHandlers={{
          click: (e) => {
            this.setLatLng(e.latlng);
          },
        }}
      >
        <Popup>Drag me!</Popup>
      </Marker> */}
        <MoveableMarker
          origin={[32.7502, 114.7655]}
          clickHandler={handleMapClicked}
          updateHandler={handleUpdateLatLong}
          moveable={gameState}
        />
        {gameState ? null : (
          <Polyline
            positions={[
              [lat, long],
              [userClickLatLong.lat, userClickLatLong.lng],
            ]}
          ></Polyline>
        )}
        {gameState ? null : (
          <Marker
            title={"Actual Location"}
            position={[lat, long]}
            draggable={false}
            autoPan={true}
            animate={true}
          >
            <DistancePopup
              lat={lat}
              long={long}
              latLongObj={userClickLatLong}
            ></DistancePopup>
          </Marker>
        )}
      </MapContainer>
      <Button
        label="Confirm"
        isActive={!buttonState}
        onClick={handleButtonClicked}
      />
    </>
  );
};

export default Map;
