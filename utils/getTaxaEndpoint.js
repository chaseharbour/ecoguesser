import axios from "axios";

export const fetchTaxaData = async (placeId) => {
  try {
    console.log(placeId);

    const res =
      await axios.get(`https://api.inaturalist.org/v1/taxa?is_active=true&taxon_id=47604&rank=species&introduced=false&per_page=5&preferred_place_id=${placeId}
    `);

    return {
      error: false,
      data: res.data,
    };
  } catch (err) {
    // console.error(err);

    return {
      error: true,
      data: null,
    };
  }
};
