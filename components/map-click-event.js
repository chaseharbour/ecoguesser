import { latLng } from "leaflet";
import { map } from "leaflet";
import { useState } from "react";
import { useMapEvent } from "react-leaflet";

const ClickEvent = ({ lat, long }) => {
  const [latLong, setLatLong] = useState([lat, long]);

  const map = useMapEvent("click", (e) => {
    console.log(
      `You are ${map.distance(e.latlng, latLng(latLong)) / 1000}km away!`
    );
  });
  return null;
};

export default ClickEvent;
