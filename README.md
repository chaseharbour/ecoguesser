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

## Game vs. game-csr branches

Currently the most up-to-date code resides in these two development branches. They both house all of the game logic with some key differences.

I was trying to wrap my head around the most efficient way to accomplish my goals in regards to API consumption so I prototyped two different methods.

### Game

First, I wanted to utilize NextJS' server side rendering (SSG) to create a smoother user experience on the front end.

I also wanted to incorporate NextJS' dynamic routing to create a URL slug so friends could play and share the same game boards. Ultimately I was able to accomplish this with client side rendering (CSR) as well.

### Game-csr

I got to a point in development where I felt like my implementation of SSG was creating some inefficiencies in regards to external API consumption.

After some research and reflection I found a path using CSR that would create an identical application flow on the front end but would make less external API calls.

### Outcome

I ultimately decided to revisit my original implementation with SSG for a couple reasons:

- First, the user experience with CSR just left so much to be desired after seeing it wtth SSG. This alone was enough to make me reconsider optimizing my implementation of SSG.

- Second, as I progressed in prototyping CSR I realized that my external API consumption wasn't actually that much more efficient. I was still having to make multiple calls to set up a game and the user experience was suffering greatly.

To anyone still reading this, I really debated just deleting the game-csr branch and pretending none of this happened. However, I thought it could be a good opportunity to highlight some of my decision making in a project of my own and also to highlight some of my learning moments.

This was a big reminder for me to really plan out big changes from start to finish before trying to implement an entirely new approach. Because of this experience I always whiteboard things when I hit a technical impass.

This has been very cool to reflect on and to pinpoint the events that led to some developer good habits I have now.

## Taxa API Specifics

The most efficient usage of the [taxa endpoint](https://api.inaturalist.org/v1/docs/#!/Taxa/get_taxa) seems to be usage of the `taxon_id` parameter. With it, you can narrow down the species returned to a single family.

Might be worthwhile filtering results that do not contain:

    "establishment_means": {
        "establishment_means": "native",
    }

Unsure on whether to get random species by querying with a random letter or using the `id_above` and `id_below` parameters.
