import { useState } from 'react';
import './App.css';

import movieListMock from './data/movieListData.json';
import MovieCard from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState(movieListMock.results);

  return (
    <ul className='container'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default App;
