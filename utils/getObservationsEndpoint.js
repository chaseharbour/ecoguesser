import axios from "axios";

export const fetchObservationData = async (lat, long) => {
  //TODO: First pass of 'per_page=0' to get 'total_results'. If 'total_results' > n, then get n 'iconic_taxa=Aves' and n 'iconic_taxa=Plantae' and n 'iconic_taxa=Mammalia' and n 'iconic_taxa=Reptilia'.

  const config = {
    //ttl param. sets Cache-Control header
    maxAge: 60 * 20,
    //Radius around lat/long in km
    radius: 200,
    //Taxa is native
    isNative: true,
    //How to order results (created_at, observed_on, species_guess, votes, id)
    orderBy: "created_at",
  };
  try {
    const res =
      await axios.get(`https://api.inaturalist.org/v1/observations?captive=false&identified=true&native=true&out_of_range=false&photos=true&lat=${lat}&lng=${long}&radius=200&order=desc&order_by=created_at&ttl=${config.maxAge}
        `);

    return res;
  } catch (err) {
    console.error(err);
  }
};
