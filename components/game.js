import React from "react";

const Game = ({ taxaData, elev }) => {
  return (
    <div>
      <h1>Game</h1>
      <p>Guess the location at an elevation of: {elev}m</p>
      <ul>
        {taxaData.map((t) => (
          <li>
            <img src={t.taxon.default_photo.medium_url}></img>
            <p>{t.taxon.preferred_common_name}</p>
            <p>{t.taxon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Game;
