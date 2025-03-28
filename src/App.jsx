import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PokemonPage from "./Pages/PokemonPage.jsx";
import Home from "./Pages/Home.jsx"

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>} />
                <Route path = "/pokemon/:name" element = {<PokemonPage />} />
            </Routes>
        </Router>
    );
};

export default App;