import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import styles from './NavBar.module.css';
import useDebounce from '../../utils/useDebounced';

export default function NavBar() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearchText = useDebounce(text, 500);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debouncedSearchText) {
      setSearchParams({ query: debouncedSearchText });

      if (!searchParams.get('query')) {
        navigate(`/search?query=${encodeURIComponent(debouncedSearchText)}`);
      }
    } else {
      setSearchParams({});
      if (searchParams.get('query')) {
      }
    }
  }, [debouncedSearchText, setSearchParams, navigate, searchParams]);

  useEffect(() => {
    const currentQuery = searchParams.get('query');

    if (currentQuery !== null && currentQuery !== text) {
      setText(currentQuery);
    }
  }, [searchParams]);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearchText = text.trim();
    if (trimmedSearchText) {
      setSearchParams({ query: trimmedSearchText });
      navigate(`/search?query=${encodeURIComponent(trimmedSearchText)}`);
    } else {
      setSearchParams({});
      navigate('/');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/'>
          <h1 className={styles.title}>OZ무비</h1>
        </Link>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type='text'
            placeholder='Search...'
            className={styles.input}
            value={text}
            onChange={handleChange}
          />
          <div className={styles.btns}>
            <button>로그인</button>
            <button>회원가입</button>
          </div>
        </form>
      </div>
    </nav>
  );
}
