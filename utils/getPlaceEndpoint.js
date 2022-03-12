import axios from "axios";

export const fetchPlaceData = async () => {
  try {
    const consonants = ["b"];
    const vowels = ["a"];

    const randConsonant =
      consonants[Math.floor(Math.random() * consonants.length)];
    const randVowel = vowels[Math.floor(Math.random() * vowels.length)];

    const res =
      await axios.get(`https://api.inaturalist.org/v1/places/autocomplete?q=${randConsonant}%2C${randVowel}
    `);

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
