import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import PokemonCard from "./components/pokemon-card/PokemonCard";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    useEffect( () => {
        async function fetchAllPokemons() {
            toggleLoading(true);
            setError(false);

            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
                setPokemons(response.data);
            } catch(e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false)
        }
        fetchAllPokemons();
    }, [pokemons])


    return (
        <div>
            <PokemonCard pokemonName={pokemonName} />
        </div>
  );
}

export default App;
