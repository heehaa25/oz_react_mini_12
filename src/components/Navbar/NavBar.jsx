import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './NavBar.module.css';
import useDebounce from '../../hooks/useDebounced';
import { useSupabaseAuth } from '../../auth/index';
import { useAuthContext } from '../../context/AuthContext';

export default function NavBar() {
  const { user, setUser } = useAuthContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();
  const debouncedValue = useDebounce(text, 500);

  //const [userInfo, setUserInfo] = useState(null);

  const { logout } = useSupabaseAuth(); //getUserInfo,
  // const info = getUserInfo();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUserInfo();
  //     setUserInfo(user);
  //   };

  //   fetchUser();
  // }, [location]);

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

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar}  ${isMenuOpen ? styles.expanded : ''}`}>
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
          {user ? (
            <div className={styles.userMenu}>
              <div className={styles.dropdown}>
                <button onClick={() => navigate('/mypage')}>마이페이지</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            </div>
          ) : (
            <div className={`${styles.btns} ${isMenuOpen ? styles.show : ''}`}>
              <button
                className={styles.btns}
                onClick={() => handleNavigate('/login')}
              >
                로그인
              </button>
              <button
                className={styles.btns}
                onClick={() => handleNavigate('/signup')}
              >
                회원가입
              </button>
            </div>
          )}
        </form>
        <button className={styles.bar} onClick={handleBarClick}>
          <GiHamburgerMenu />
        </button>
      </div>
    </nav>
  );
}
