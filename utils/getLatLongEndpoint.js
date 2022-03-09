import axios from "axios";

export const fetchLatLongData = async () => {
  try {
    const res = await axios.get("https://api.3geonames.org/randomland.json");

    console.log(res.data);

    return {
      error: false,
      data: res.data,
    };
  } catch (err) {
    console.error(err);

    return {
      error: true,
      data: null,
    };
  }
};
