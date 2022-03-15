const { fetchLatLongData } = require("./getLatLongEndpoint");
const { fetchObservationData } = require("./getObservationsEndpoint");

const handleNewGameSetup = async () => {
  let latLong = await fetchLatLongData();

  let check_res = await fetchObservationData(
    latLong.data.major.latt,
    latLong.data.major.longt
  );

  console.log(check_res);

  if (check_res.data.total_results < 20) {
    //   latLong = await fetchLatLongData();
    //   check_res = await fetchObservationData(
    //     latLong.data.major.latt,
    //     latLong.data.major.longt
    //   );

    //   console.log(check_res);

    return await handleNewGameSetup();
  }

  return latLong;
};

module.exports = {
  handleNewGameSetup,
};
