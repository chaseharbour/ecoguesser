import axios from "axios";

export const fetchObservationData = async (
  lat,
  long,
  perPage = 0,
  page = 1,
  orderBy = "created_at"
) => {
  //TODO: First pass of 'per_page=0' to get 'total_results'. If 'total_results' > n, then get n 'iconic_taxa=Aves' and n 'iconic_taxa=Plantae' and n 'iconic_taxa=Mammalia' and n 'iconic_taxa=Reptilia'.

  const config = {
    //ttl param. sets Cache-Control header
    maxAge: 60 * 20,
    //Radius around lat/long in km
    radius: 200,
    //Taxa is native
    isNative: true,
    //How to order results (created_at, observed_on, species_guess, votes, id)
    orderBy,
    //How many results per page
    perPage,
    //For pagination
    page,
  };

  try {
    const res =
      await axios.get(`https://api.inaturalist.org/v1/observations?captive=false&identified=true&native=true&out_of_range=false&photos=true&lat=${lat}&lng=${long}&radius=${config.radius}&order=desc&order_by=${config.orderBy}&ttl=${config.maxAge}&page=${config.page}&per_page=${config.perPage}
        `);

    return {
      error: false,
      data: res.data,
    };
  } catch (err) {
    console.error(err);
  }
};
