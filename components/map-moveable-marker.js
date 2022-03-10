import React, { useState, useRef, useMemo, useCallback } from "react";
import { Marker, useMapEvent } from "react-leaflet";

const MoveableMarker = ({ origin }) => {
  const [position, setPosition] = useState(origin);
  const markerRef = useRef(null);

  //   const eventHandlers = useMemo(
  //     () => ({
  //       click(e) {
  //         const marker = markerRef.current;
  //         if (marker !== null) {
  //           setPosition(e.latlng);
  //         }
  //       },
  //     }),
  //     []
  //   );

  const onClick = useCallback((e) => {
    const marker = markerRef.current;
    marker.setLatLng(e.latlng);
  });

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
