import React, { useEffect, useState } from 'react';
import './PokemonCard.css'
import axios from 'axios'

function PokemonCard({ pokemonName }) {
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {

        async function fetchSinglePokemon() {

            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                console.log(response.data);
                setPokemon(response.data);
            }
            catch(e) {
                console.error(e)
            }
        }
        void fetchSinglePokemon();
    }, [pokemonName])

    return (
            <section className="pokemon-card">
                {pokemon &&
                    <>
                        <h2>{pokemon.species.name}</h2>
                        <img src={pokemon.sprites.front_default} alt={`image of ${pokemon.species.name}`} />
                        <h3>Moves: {pokemon.moves.length}</h3>
                        <h3>Weight: {pokemon.weight} </h3>
                        <h3>Abilities:</h3>
                        <ul>
                            {pokemon.abilities.map((newArray) => {
                                return (
                                    <li className="ability" key={`${newArray.ability.name}`}>
                                    {newArray.ability.name}
                                    </li>
                                   )
                               })}
                        </ul>
                    </>
                }
            </section>
        );
    }

export default PokemonCard;