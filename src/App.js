import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Button from './components/button/Button';
import PokemonCard from './components/pokemon-card/PokemonCard';

function App() {
    const [pokemons, setPokemons] = useState();
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');

    useEffect( () => {
        async function fetchAllPokemons() {
            toggleLoading(true);
            setError(false);

            try {
                const { data } = await axios.get(endpoint);
                setPokemons(data);
            } catch(e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false)
        }
        fetchAllPokemons();
    }, [endpoint])


    return (
      <div className="pokemon-deck">
          {pokemons &&
           <>
               <section className="button-wrapper">
                   <Button
                       disabled={!pokemons.previous} // De knop werkt niet als er geen vorige lijst van 20 pokemons is.
                       clickHandler={() => setEndpoint(pokemons.previous)}
                   >
                       Vorige
                   </Button>
                   <Button
                       disabled={!pokemons.next} // De knop werkt niet als er geen lijst van volgende (max) 20 pokemons zijn.
                       clickHandler={() => setEndpoint(pokemons.next)}
                   >
                       Volgende
                   </Button>
               </section>
             {pokemons.results &&
                 pokemons.results.map((pokemonCard) => {
                 return <PokemonCard key={pokemonCard.name} pokemonName={pokemonCard.name}/>
             })}
           </>
          }
        {loading && <p>Loading...</p>}
        {error && <p>Something went wrong with fetching data</p>}
      </div>
   );
}

export default App;
