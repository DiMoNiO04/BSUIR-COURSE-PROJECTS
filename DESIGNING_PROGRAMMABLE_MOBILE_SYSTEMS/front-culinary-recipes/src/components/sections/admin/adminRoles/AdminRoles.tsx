import React from 'react';
import styles from './AdminRoles.module.scss';
import { useGetRoles } from '@/api/hooks';
import { ErrorFetch, Loading, NothingMessage } from '@/components/ui';
import { RoleCard } from '@/components/cards';

const AdminRoles: React.FC = () => {
  const { data: roles, isLoading, isError } = useGetRoles();

  return (
    <article>
      <h2 className={styles.title}>Roles</h2>

      {isError && <ErrorFetch />}
      {isLoading && <Loading />}

      {!isLoading &&
        !isError &&
        (roles && roles.length > 0 ? (
          <div className={styles.cards}>
            {roles.map((role) => (
              <RoleCard key={role.id} {...role} />
            ))}
          </div>
        ) : (
          <NothingMessage text="No roles available at the moment!" />
        ))}
    </article>
  );
};

export default AdminRoles;
