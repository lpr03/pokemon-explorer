import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name} (#{pokemon.id})</h2>
      <div className="types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type ${type}`}>{type}</span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
