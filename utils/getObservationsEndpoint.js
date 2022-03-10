import axios from "axios";

export const fetchObservationData = async (lat, long) => {
  try {
    const res =
      await axios.get(`https://api.inaturalist.org/v1/observations?captive=false&identified=true&native=true&out_of_range=false&photos=true&lat=${lat}&lng=${long}&radius=200&order=desc&order_by=created_at
        `);

    return {
      error: false,
      data: res.data,
    };
  } catch (err) {
    console.error(err);
  }
};
