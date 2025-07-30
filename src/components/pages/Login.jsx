import { useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router';
import FormInput from '../FormInput/FormInput';
import { useSupabaseAuth } from '../../auth/index';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const { setUser } = useAuthContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const { email, password } = form;
    const { user, error } = await login({ email, password });
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } else {
      console.log(error);
      setErrors({ form: '로그인 실패: 유저 정보가 없습니다' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>로그인</h1>
      <FormInput
        label='이메일'
        name='email'
        type='email'
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        label='비밀번호'
        name='password'
        type='password'
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />

      <button className={styles.btn}>로그인</button>
      <p>
        OZ무비가 처음이신가요?
        <Link to='/signup' className={styles.signupLink}>
          간편 가입
        </Link>
      </p>
    </form>
  );
}
