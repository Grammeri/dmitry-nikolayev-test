'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

const ClientHeader = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {pathname !== '/login' ? (
            <>
              <li className={styles.li}>
                <Link href="/main" className={styles.a}>
                  Home
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/store" className={styles.a}>
                  Store
                </Link>
              </li>
              <li className={styles.li}>
                <Link href="/login" className={styles.a}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>Тестовая работа Дмитрия Николаева</>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default ClientHeader;
