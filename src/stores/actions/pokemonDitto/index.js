import { servicePokemonContentParam } from "../../../utils/api/pokemonDittoService";

export const FETCH_POKEMON_REQUEST = 'pokemonDitto/FETCH_POKEMON_REQUEST';
export const FETCH_POKEMON_SUCCESS = 'pokemonDitto/FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'pokemonDitto/FETCH_POKEMON_FAILURE';
export const FETCH_POKEMON_DETAIL = 'pokemonDitto/FETCH_POKEMON_DETAIL';

export const fetchPokemonRequest = () => ({
    type: FETCH_POKEMON_REQUEST,
});

export const fetchPokemonSuccess = (data) => ({
    type: FETCH_POKEMON_SUCCESS,
    payload: data
});

export const fetchPokemonFailure = (error) => ({
    type: FETCH_POKEMON_FAILURE,
    payload: error
});

export const fetchPokemonDetails = (data) => ({
    type: FETCH_POKEMON_DETAIL,
    payload: data
})

export const fetchPokemon = () => {
    return (dispatch) => {
        dispatch(fetchPokemonRequest());

        servicePokemonContentParam()
            .then(response => {
                const pokemonData = response.data.results;
                dispatch(fetchPokemonSuccess(pokemonData));

                const fetchPromises = pokemonData.map(pokemon => {
                    return fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonDetails => {
                        dispatch(fetchPokemonDetails(pokemonDetails))
                    })
                    .catch(error => {
                        dispatch(fetchPokemonFailure(error.message))
                    })
                })

                Promise.all(fetchPromises)
                    .then(() => {
                        console.log("All Pokemon details fetched successfully.");
                    })
                    .catch(error => {
                        console.error("Error fetching Pokemon details:", error);
                    });

            })
            .catch(error => {
                dispatch(fetchPokemonFailure(error.message))
            });
    }
}