'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/shared/utils/formatDate';
import styles from './UserTable.module.scss';

type UserItem = {
  id: number;
  name: string;
  role: string;
  ctime: number;
};

const UserTable = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    const offset = page * limit;
    const response = await fetch(
      `https://test.dev-relabs.ru/api/users/list?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    console.log(data.items); // Добавляем вывод данных в консоль для проверки
    setUsers(data.items);
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Created</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={styles.td}>{user.id}</td>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.role}</td>
                <td className={styles.td}>{formatDate(user.ctime)}</td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button
          className={styles.button}
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className={styles.button} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
