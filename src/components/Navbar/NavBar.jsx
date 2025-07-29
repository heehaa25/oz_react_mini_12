import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './NavBar.module.css';
import useDebounce from '../../hooks/useDebounced';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [text, setText] = useState('');
  const navigate = useNavigate();
  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedValue) {
      navigate(`/search?query=${encodeURIComponent(debouncedValue)}`);
    } else {
      navigate('/');
    }
  }, [debouncedValue]);

  const handleInputChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBarClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogoClick = () => {
    setText('');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to='/'>
          <h1 className={styles.title} onClick={handleLogoClick}>
            OZ무비
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className={`${styles.form} ${isMenuOpen ? styles.active : ''}`}
        >
          <input
            type='text'
            placeholder='Search...'
            className={styles.input}
            value={text}
            onChange={handleInputChange}
          />
          <div className={styles.btns}>
            <button className={styles.btns}>로그인</button>
            <button className={styles.btns}>회원가입</button>
          </div>
        </form>
        <button className={styles.bar} onClick={handleBarClick}>
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}
