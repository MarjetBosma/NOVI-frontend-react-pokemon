import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
// import pokemonLogo from './assets/pokemonLogo.svg'
// Als ik het logo probeer weer te geven krijg ik een foutmelding die ik niet begrijp, dus om de applicatie te kunnen runnen, heb ik dit maar uitgezet.
import Button from './components/button/Button';
import PokemonCard from './components/pokemon-card/PokemonCard';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');

    useEffect( () => {
        async function fetchAllPokemons() {
            toggleLoading(true);
            setError(false);

            try {
                const response = await axios.get(endpoint);
                setPokemons(response.data.results);
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
             {/*<img src={pokemonLogo} alt="pokemon logo" width="400px" />*/}
             {/*Als ik het logo probeer weer te geven krijg ik een foutmelding die ik niet begrijp, dus om de applicatie te kunnen runnen, heb ik dit maar uitgezet.*/}
               <section className="button-wrapper">
                   <Button
                       disabled={!pokemons.previous} // De knop werkt niet als er geen vorige lijst van 20 pokemons is. // De knop werkt niet als er geen lijst van volgende (max) 20 pokemons zijn. Tenminste, dat is de bedoeling, want om mijn onduidelijke redenen blijft de button altijd op disabled staan.
                       clickHandler={() => setEndpoint(pokemons.previous)}
                   >
                       Vorige
                   </Button>
                   <Button
                       disabled={!pokemons.next} // De knop werkt niet als er geen lijst van volgende (max) 20 pokemons zijn. Tenminste, dat is de bedoeling, want om mijn onduidelijke redenen blijft de button altijd op disabled staan.
                       clickHandler={() => setEndpoint(pokemons.next)}
                   >
                       Volgende
                   </Button>
               </section>
             {pokemons &&
                 pokemons.map((pokemonCard) => {
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
