import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/PokemonList.scss";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const navigate = useNavigate();
  const limit = 22;

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageOffset}`
      )
      .then((response) => {
        const pokemonData = response.data.results.map((pokemon) => {
          return { ...pokemon, id: pokemon.url.split("/")[6] };
        });
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
      })
      .catch((error) => console.error("Error fetching Pokemon List:", error));
  }, [pageOffset]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  const handleNextPage = () => {
    setPageOffset((prevOffset) => prevOffset + limit);
  };

  const handlePrevPage = () => {
    setPageOffset((prevOffset) => Math.max(0, prevOffset - limit));
  };

  return (
    <div>
      <h1 className="center-div">Pokemon List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <ul className="pokemon-list">
        {filteredPokemon.map((pokemon, index) => (
          <li
            key={index}
            className="pokemon-list"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            style={{ cursor: "pointer" }}
          >
            <span>{pokemon.name.toUpperCase()}</span>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/${pokemon.id}.png`}
            />
          </li>
        ))}
      </ul>
      {filteredPokemon === pokemonList && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={pageOffset === 0}>
            &larr; Prev
          </button>
          <button onClick={handleNextPage}>Next &rarr;</button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
