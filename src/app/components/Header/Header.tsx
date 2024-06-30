import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/main" className={styles.a}>
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/login" className={styles.a}>
              Login
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/store" className={styles.a}>
              Store
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
