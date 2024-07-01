'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './notFound.module.scss';
import Button from '@/app/components/Button/Button';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Image
        src="/assets/404.jpeg"
        alt="404 Not Found"
        width={600}
        height={400}
        className={styles.image}
      />
      <h1 className={styles.title}>Page Not Found</h1>
      <Link href="/main">
        <Button onClick={() => {}}>Go to Main Page</Button>
      </Link>
    </div>
  );
}
