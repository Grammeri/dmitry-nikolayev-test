import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@mui/base';

const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps): React.ReactNode => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
