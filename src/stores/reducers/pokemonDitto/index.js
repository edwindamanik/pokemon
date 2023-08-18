import {
    FETCH_POKEMON_REQUEST,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
    FETCH_POKEMON_DETAIL
} from '../../actions/pokemonDitto'

const initialState = {
    loading: false,
    pokemonData: [],
    pokemonDataDetail: [],
    error: null,
};

const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMON_REQUEST: 
            return { ...state, loading: true, error: null }

        case FETCH_POKEMON_SUCCESS: 
            return { ...state, loading: false, pokemonData: action.payload }

        case FETCH_POKEMON_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_POKEMON_DETAIL:
            const updatedDetailArray = state.pokemonDataDetail.concat(action.payload);
            return { ...state, loading: false, pokemonDataDetail: updatedDetailArray };
        
        default:
            return state;
    }
}

export default pokemonReducer;