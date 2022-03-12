import React from "react";
import { Popup, useMap } from "react-leaflet";
import { latLng } from "leaflet";

const DistancePopup = ({ lat, long, latLongObj }) => {
  const map = useMap();
  const distanceBetween = map.distance(latLng(lat, long), latLng(latLongObj));

  const distanceBtwnTrimmed = Number.parseFloat(distanceBetween / 1000).toFixed(
    2
  );

  return <Popup>{`You were ${distanceBtwnTrimmed} km away`}</Popup>;
};

export default DistancePopup;
