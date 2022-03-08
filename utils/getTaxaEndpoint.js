import axios from "axios";

export const fetchTaxaData = async () => {
  try {
    const res =
      await axios.get(`https://api.inaturalist.org/v1/taxa?q=q&is_active=true&taxon_id=47604&rank=species&per_page=5&preferred_place_id=14
    `);

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
