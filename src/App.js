import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import PokemonCard from "./components/pokemon-card/PokemonCard";

function App() {

    return (
        <div>
            <PokemonCard pokemonName={pokemonName} />
        </div>
  );
}

export default App;
