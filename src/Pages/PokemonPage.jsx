import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PokemonInfo from "../Components/PokemonInfo";

const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Pokemon 404!");
        setLoading(false);
      });
  }, [name]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className = "pokemon-info-page">
      <PokemonInfo pokemon={pokemon} />
      <button onClick={handleBackClick} className="back-button">
        Back to the list
      </button>
      {/* <Link to = "/">Back to List</Link> */}
    </div>
  );
};

export default PokemonPage;
