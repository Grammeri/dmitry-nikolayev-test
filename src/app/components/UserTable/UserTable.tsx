'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/app/shared/utils/formatDate';
import styles from './UserTable.module.scss';
import { CircularProgress, Pagination } from '@mui/material';
import { UserItem } from '@/app/interfaces/products';

const UserTable = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 5;
  const totalPages = Math.ceil(totalCount / limit);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

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

      setTotalCount(data.total);
      setUsers(data.items);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 className="table-heading">Users</h2>
      {loading ? (
        <CircularProgress />
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
                  <div
                    className={styles.delete}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ marginBottom: '1.5rem' }} className="pagination-buttons">
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserTable;
