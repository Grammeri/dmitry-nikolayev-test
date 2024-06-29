import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
