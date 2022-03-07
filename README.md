## The idea

With the data from the [iNaturlist API](https://api.inaturalist.org/v1/docs/#/), the app will pull [taxonomy data](https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa) using randomly chosen [location ids](https://api.inaturalist.org/v1/docs/#!/Places) to create a location guessing game similar to [Geoguessr](https://www.geoguessr.com/).

User flow will work as follows:

- User hits landing page
- User choose to start a game
- Data for two rounds is cached in app state
  1. App hits `Places` api endpoint with randomly generated id and confirms the location exists
     - Values between `1` and `180223` seem to be valid
     - Lat/long will be gathered at this step
  2. App hits `Taxa` api endpoint using the verified location and the following rules:
     - At least one shrub family
     - At least one tree family
     - At least one bird family
  3. Images and names are rendered
  4. User selects lat/long by clicking on a map
  5. User selected lat/long compared to actual lat/long with error margin
  6. User chooses whether to play again.

## Taxa API Specifics

The most efficient usage of the [taxa endpoint](https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa) seems to be usage of the `taxon_id` parameter. With it, you can narrow down the species returned to a single family.

Might be worthwhile filtering results that do not contain:

    "establishment_means": {
        "establishment_means": "native",
    }

Unsure on whether to get random species by querying with a random letter or using the `id_above` and `id_below` parameters.
