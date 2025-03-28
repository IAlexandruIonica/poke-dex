import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";
import PokemonInfo from "../Components/PokemonInfo";

const PokemonPage = () => {
    const{ name } = useParams();
    const [pokemon, setPokemon] = useState (null);
    const [loading, setLoading] = useState (true);
    const [error, setError] = useState (null);

    useEffect(() =>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) =>{
            setPokemon(response.data);
            setLoading(false);
        })
        .catch(() => {
            setError("Pokemon 404!");
            setLoading(false);
        });
    }, [name]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p style= {{color:"red"}}>{error}</p>;

    return (
        <div>
            <PokemonInfo pokemon = {pokemon} />
            <Link to = "/">Back to List</Link>
        </div>
    );
};

export default PokemonPage;