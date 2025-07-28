import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMovieDetail } from '../../api';
import styles from './MovieDetail.module.css';

export default function MovieDetail() {
  const { movieId } = useParams();
  const [detail, setDetail] = useState([]);
  const { backdrop_path, poster_path, title, vote_average, genres, overview } =
    detail;

  const BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const displayImagePath = backdrop_path || poster_path;
  const src = displayImagePath ? `${BASE_URL}${backdrop_path}` : null;

  const loadMovieDetail = async () => {
    const movieDetailData = await getMovieDetail(movieId);
    setDetail(movieDetailData);
  };

  useEffect(() => {
    loadMovieDetail();
  }, [movieId]);

  return (
    <div className={styles.maxcontainer}>
      <section className={styles.container}>
        {src && <img src={src} alt={title} className={styles.img} />}

        <div className={styles.title}>
          <h1 className={styles.movietitle}>{title}</h1>
          <span className={styles.average}>
            {`평점: ${
              typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A'
            }`}
          </span>
        </div>
        {genres && (
          <span className={styles.genres}>
            장르: {genres.map((genre) => genre.name).join(' / ')}
          </span>
        )}
        <p className={styles.overview}>{overview}</p>
      </section>
    </div>
  );
}
