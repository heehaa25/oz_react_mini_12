import { useNavigate } from 'react-router';
import styles from './MovieCard.module.css';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const { id, backdrop_path, title, vote_average } = movie;
  const src = `${baseUrl}${backdrop_path}`;
  const navigate = useNavigate();
  const handleMovieClick = () => {
    navigate(`/details/${id}`);
  };

  return (
    <section className={styles.card} onClick={handleMovieClick} role='link'>
      <img src={src} alt={`${title} img`} className={styles.image} />
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.average}>평점: {vote_average.toFixed(1)}</p>
      </div>
    </section>
  );
}
