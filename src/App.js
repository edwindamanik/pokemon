import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon } from './stores/actions/pokemonDitto';
import Card from './components/Card';

function App() {
  const dispatch = useDispatch();

  const { loading, pokemonData, pokemonDataDetail, error } = useSelector(state => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon());
  }, [dispatch])


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
      {pokemonDataDetail.map((pokemonDetail, index) => (
        <Card 
          key={index}
          title={pokemonDetail.name}
          imageSrc={pokemonDetail.sprites.front_default}
        />
      ))}
    </div>
  );
}

export default App;
