import "../Styles/PokemonInfo.scss";


const PokemonInfo = ({pokemon}) => {
    return (
        <div className = "pokemon-info">
            <h1>
                {pokemon.name.toUpperCase()}
            </h1>
            <img src = {pokemon.sprites.front_default} alt={pokemon.name}/>
            <p>
                Type:{pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
                Height: {pokemon.height}
            </p>
            <p>
                Weight: {pokemon.weight}
            </p>
        </div>
    );
};


export default PokemonInfo;
