'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/shared/utils/formatDate';
import Button from '@/app/components/Button/Button';
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
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const limit = 5;

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    const offset = page * limit;
    try {
      const response = await fetch(
        `https://test.dev-relabs.ru/api/users/list?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.items);
      if (data.items.length < limit) {
        setHasMoreUsers(false);
      } else {
        setHasMoreUsers(true);
      }
      setUsers(data.items);
    } catch (error) {
      console.error('Fetching users failed:', error);
      setHasMoreUsers(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2 className="table-heading">Users</h2>
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
                  <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginBottom: '1.5rem' }} className="pagination-buttons">
        <Button onClick={handlePrevious} disabled={page === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!hasMoreUsers}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
