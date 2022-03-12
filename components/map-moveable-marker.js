import React, { useState, useRef, useEffect, useCallback } from "react";
import { Marker, useMapEvent } from "react-leaflet";

const MoveableMarker = ({ origin, moveable, clickHandler, updateHandler }) => {
  const [position, setPosition] = useState(origin);
  const [isMoveable, setIsMoveable] = useState(true);
  const markerRef = useRef(null);

  useEffect(() => {
    setIsMoveable(moveable);
  }, [moveable]);

  const onClick = (e) => {
    if (isMoveable) {
      const marker = markerRef.current;
      marker.setLatLng(e.latlng);
      updateHandler(e.latlng);
      console.log(e.latlng);
      clickHandler(e.latlng);
    }

    return;
  };

  useMapEvent("click", onClick);

  return (
    <Marker
      draggable={false}
      //   eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

export default MoveableMarker;
