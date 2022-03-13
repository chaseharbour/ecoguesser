import React from "react";

const Game = ({ taxaData }) => {
  return (
    <div>
      <h1>Game</h1>
      <ul>
        {taxaData &&
          taxaData.map((t) => (
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
