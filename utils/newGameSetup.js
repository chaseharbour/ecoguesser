const { fetchLatLongData } = require("./getLatLongEndpoint");
const { fetchObservationData } = require("./getObservationsEndpoint");

const handleNewGameSetup = async () => {
  //Gets random latitude and longitude from third party API
  let latLong = await fetchLatLongData();

  //Checks for a list of organisms found near the random latitude and longitutde
  let check_res = await fetchObservationData(
    latLong.data.major.latt,
    latLong.data.major.longt
  );

  console.log(check_res);

  //Makes sure at least 20 organisms are found before making game playable
  if (check_res.data.total_results < 20) {
    return await handleNewGameSetup();
  }

  //Returns latitude and longitude to be used
  return latLong;
};

module.exports = {
  handleNewGameSetup,
};
