import Link from 'next/link';
import Image from 'next/image';
import styles from './404.module.scss';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Image
        src="/assets/404.jpeg"
        alt="404 Not Found"
        width={600}
        height={400}
      />
      <h1 className={styles.title}>Page Not Found</h1>
      <Link href="/main">
        <button className={styles.button}>Go to Main Page</button>
      </Link>
    </div>
  );
}
