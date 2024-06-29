'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/shared/utils/formatDate';
import styles from './EventsTable.module.scss';

type EventItem = {
  ctime: number;
  event: string;
};

const EventsTable = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const socket = new WebSocket('wss://test.dev-relabs.ru/event');
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      setEvents((prevEvents) => [...prevEvents, eventData]);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2 className="table-heading">Events</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Time</th>
            <th className={styles.th}>Event</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className={styles.td}>{formatDate(event.ctime)}</td>
              <td className={styles.td}>{event.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
