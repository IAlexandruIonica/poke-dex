import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/PokemonList.scss";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();

  console.log(pokemonList);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        setPokemonList(response.data.results.map((pokemon) => {
           return {...pokemon, id:pokemon.url.split("/")[6]}
        }));
      })
      .catch((error) => console.error("Error fetching Pokemon List:", error));
  }, []);

  return (
    <div>
      <h1 className="center-div">Pokemon List</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
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
    </div>
  );
};
export default PokemonList;
