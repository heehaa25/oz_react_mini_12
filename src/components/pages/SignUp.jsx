import { useState } from 'react';
import styles from './SignUp.module.css';
import FormInput from '../FormInput/FormInput';
import { useSupabaseAuth } from '../../auth/index';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    placeholder: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9가-힣]{2,8}$/.test(form.name)) {
      newErrors.name = '이름을 입력해 주세요';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '이메일 형식으로 입력해 주세요';
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(form.password)) {
      newErrors.password = '비밀번호는 대소문자+숫자 포함 6자 이상이어야 해요';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않아요';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, password, name } = form;
      const { error } = await signUp({ email, password, userName: name });

      if (error) {
        alert('회원가입 실패: ' + error.message);
      } else {
        alert('회원가입 성공!');
        navigate('/login');
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>회원등록</h1>

      <FormInput
        label='이름'
        name='name'
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder='2~8자, 숫자, 한글, 영어만 사용'
      />
      <FormInput
        label='이메일'
        name='email'
        type='email'
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder='example@email.com'
      />
      <FormInput
        label='비밀번호'
        name='password'
        type='password'
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder='영문 대문자/소문자 + 숫자의 조합 사용'
      />
      <FormInput
        label='비밀번호 확인'
        name='confirmPassword'
        type='password'
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder='비밀번호를 다시 입력하세요'
      />
      <button type='submit' className={styles.btn}>
        회원가입
      </button>
    </form>
  );
}
