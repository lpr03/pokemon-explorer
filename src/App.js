import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import { fetchPokemonList, fetchPokemonDetails } from './services/api';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [allTypes, setAllTypes] = useState([]);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await fetchPokemonList();
        const promises = data.results.map(async (pokemon) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map((t) => t.type.name),
          };
        });
        const results = await Promise.all(promises);
        setPokemons(results);
        setFilteredPokemons(results);
        extractTypes(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  const extractTypes = (pokemons) => {
    const typesSet = new Set();
    pokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => typesSet.add(type));
    });
    setAllTypes(Array.from(typesSet));
  };

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter types={allTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {filteredPokemons.length === 0 ? (
        <div className="status">No Pokémon found.</div>
      ) : (
        <div className="card-grid">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;