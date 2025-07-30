import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard/MovieCard';
import { getMovieData, searchMovies } from './api';
import { useSearchParams } from 'react-router';
import { useSupabaseAuth } from './auth/index';
import './App.css';

function App() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('query');

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getUserInfo } = useSupabaseAuth();

  useEffect(() => {
    try {
      const user = getUserInfo();
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        localStorage.removeItem('userInfo');
      }
    } catch (e) {
      console.error('localStorage 처리 중 에러 발생:', e);
    }
  }, []);

  const fetchMovieData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let searchMovie = [];
      if (keyword) {
        searchMovie = await searchMovies(keyword);
      } else {
        searchMovie = await getMovieData();
      }
      setData(searchMovie);
    } catch (err) {
      setError('😢 Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [keyword]);

  if (isLoading) return <div>영화 목록을 불러오는 중입니다...</div>;

  if (error) return <div>{error}</div>;

  if (data.length === 0 && keyword) {
    return <div>"{keyword}"(으)로 검색된 영화가 없습니다. 🙁</div>;
  }
  if (data.length === 0 && !keyword) {
    return <div>표시할 영화가 없습니다. 🤔</div>;
  }

  return (
    <div className='container'>
      <h2 className='title'>
        {keyword ? `'${keyword}' 검색 결과` : '인기 영화 목록'}
      </h2>
      <ul className='list'>
        {data.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
