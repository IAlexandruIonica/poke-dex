import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PokemonList = () => {
    const [ pokemonList, setPokemonList] = useState([])


useEffect(() => {
    axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=20") 
    .then((response) =>{
        setPokemonList(response.data.results);
    })
    .catch((error) => console.error("Error fetching Pokemon List:", error));
    
}, []);

return (
    <div>
        <h1>Pokemon List</h1>
        <ul>
            {pokemonList.map((pokemon, index) => (
                <li key={index}>
                    <Link to = {`/pokemon/${pokemon.name}`}>{pokemon.name.toUpperCase()}</Link>
                </li>
            ))}
        </ul>
    </div>
);
};
export default PokemonList;