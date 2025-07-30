import styles from './FormInput.module.css';

export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.formlabel}>
        {label}
      </label>
      <input
        className={`${styles.forminput} ${error ? styles.inputError : ''}`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
