import React, { useState } from 'react';
import styles from './AdminUsers.module.scss';
import { useGetUsers } from '@/api/hooks';
import { ErrorFetch, Loading, Select } from '@/components/ui';
import { UserCard } from '@/components/cards';
import { useDebounce } from '@/hooks';
import { sortUsers } from '@/data';
import { useSortUsers } from '@/hooks';

const AdminUsers: React.FC = () => {
  const { data: users, isLoading, isError } = useGetUsers();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredUsers =
    users?.filter(
      (user) =>
        user.firstName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    ) || [];

  const { sortOption, handleSortChange, sortedUsers } = useSortUsers(filteredUsers);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <article>
      <h2 className={styles.title}>Users</h2>

      <div className={styles.searchSortContainer}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
        <div className={styles.sortContainer}>
          <span>{`(${filteredUsers.length} users)`}</span>
          <Select name="sort" value={sortOption} onChange={handleSortChange} options={sortUsers} />
        </div>
      </div>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading && !isError && (
        <div>
          {sortedUsers().length > 0 ? (
            <div className={styles.cards}>
              {sortedUsers().map((user) => (
                <UserCard key={user.id} {...user} />
              ))}
            </div>
          ) : (
            <p>No users found!</p>
          )}
        </div>
      )}
    </article>
  );
};

export default AdminUsers;
