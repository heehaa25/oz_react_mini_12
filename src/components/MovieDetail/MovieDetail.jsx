import { useState } from 'react';
import movieDatilMock from '../../data/movieDetailData.json';
import styles from './MovieDetail.module.css';

export default function MovieDatil({ id }) {
  const [detail, setDetail] = useState(movieDatilMock);
  const { backdrop_path, poster_path, title, vote_average, genres, overview } =
    detail;
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const displayImagePath = backdrop_path || poster_path;
  const src = displayImagePath ? `${baseUrl}${displayImagePath}` : '';

  return (
    <div className={styles.container}>
      <img src={src} alt={title} className={styles.poster} />
      <div className={styles.info}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.rating}>{vote_average}</span>
        </div>
        <div className={styles.genres}>
          {genres &&
            genres.map((genre) => <span key={genre.id}>{genre.name} </span>)}
        </div>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
}
