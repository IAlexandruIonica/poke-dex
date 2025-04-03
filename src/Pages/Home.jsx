import PokemonList from "../Components/PokemonList";
import "../Styles/global.scss";

const Home = () =>{
    return(
        <div>
            <h1 className = "center-div">
                Welcome to the Palworld App
            </h1>
            <PokemonList />
        </div>
    );
};

export default Home;