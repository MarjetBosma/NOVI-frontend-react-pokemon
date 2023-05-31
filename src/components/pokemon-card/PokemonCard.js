import React, { useEffect, useState } from 'react';
import './PokemonCard.css'
import axios from 'axios'


function PokemonCard({ pokemonName }) {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {

        async function fetchPokemonData() {

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                console.log(response.data);
                setPokemon(response.data);
            }
            catch(e) {
                console.error(e)
            }
        }
        void fetchPokemonData();
    }, [pokemonName])

    return (
        <>
            <section className="poke-card">
                {Object.keys(pokemon).length > 0 &&
                    <>
                        <h2>{pokemon.species.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={`image of ${pokemon.species.name}`} />
                        <h3>Moves: {pokemon.moves.length}</h3>
                        <h3>Weight: {pokemon.weight} </h3>
                        <ul>Abilities:
                            {pokemon.abilities.map((newArray) => {
                                return <li key={`${newArray.ability.name`}
                            })}
                        </ul>
                    </>
                }
            </section>
        </>
    );
}

export default PokemonCard;