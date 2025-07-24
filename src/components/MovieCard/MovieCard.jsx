import { Link } from 'react-router';
import styles from './MovieCard.module.css';

const baseUrl = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const { poster_path, title, vote_average } = movie;
  const src = `${baseUrl}${poster_path}`;

  return (
    <Link to='/details'>
      <section className={styles.container}>
        <img src={src} alt='movieImg' className={styles.img} />
        <h3>{title}</h3>
        <p>{vote_average}</p>
      </section>
    </Link>
  );
}
