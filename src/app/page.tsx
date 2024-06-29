import '../app/styles/global.scss';

import Header from '@/app/components/Header/Header';
import UserTable from '@/app/components/UserTable/UserTable';
import EventsTable from '@/app/components/EventsTable/EventsTable';

export default function Main() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="column">
          <UserTable />
        </div>
        <div className="column">
          <EventsTable />
        </div>
      </main>
    </>
  );
}
