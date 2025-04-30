export const fetchPokemonList = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }
    return response.json();
  };
  
  export const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    return response.json();
  };
  