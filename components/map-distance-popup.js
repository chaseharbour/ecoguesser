import { useEffect } from "react";
import { Tooltip, useMap } from "react-leaflet";
import { latLng } from "leaflet";

const DistancePopup = ({ lat, long, latLongObj }) => {
  const map = useMap();
  const distanceBetween = map.distance(latLng(lat, long), latLng(latLongObj));

  const distanceBtwnTrimmed = Number.parseFloat(distanceBetween / 1000).toFixed(
    2
  );

  useEffect(() => {
    map.setView([lat, long], map.getZoom(), { animate: true });
  }, []);

  return (
    <Tooltip
      permanent={true}
    >{`You were ${distanceBtwnTrimmed}km away`}</Tooltip>
  );
};

export default DistancePopup;
