import '@/app/styles/global.scss';
import UserTable from '@/app/components/UserTable/UserTable';
import EventsTable from '@/app/components/EventsTable/EventsTable';
import styles from './Main.module.scss';

export default function Main() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.column}>
          <UserTable />
        </div>
        <div className={styles.column}>
          <EventsTable />
        </div>
      </main>
    </>
  );
}
