const TOKEN = import.meta.env.VITE_MOVIE_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getMovieData() {
  const url = `${BASE_URL}/movie/popular?api_token=${TOKEN}&language=ko-KR&page=1`;
  const res = await fetch(url, options);
  const data = await res.json();
  const movies = data.results;
  const filtered = movies.filter((movie) => movie.adult === false);
  return filtered;
}

export async function getMovieDetail(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_token=${TOKEN}&language=ko-KR`;
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function searchMovies(keyword) {
  const url = `${BASE_URL}/${
    keyword
      ? `search/movie?language=ko-KR&query=${encodeURIComponent(keyword)}`
      : 'movie/popular?language=ko&page=1'
  }`;

  const res = await fetch(url, options);
  const data = await res.json();
  const movies = data.results;
  const filtered = movies.filter((movie) => movie.adult === false);

  return filtered;
}
