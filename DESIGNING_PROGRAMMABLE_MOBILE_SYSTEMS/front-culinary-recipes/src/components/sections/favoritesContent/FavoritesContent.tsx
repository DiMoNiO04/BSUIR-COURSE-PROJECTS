import React, { useEffect, useState } from 'react';
import { RecipesCardsList } from '@/components/elements';
import { ErrorFetch, Loading, NothingMessage, Notification } from '@/components/ui';
import { useGetFavorites } from '@/api/hooks';
import styles from './FavoritesContent.module.scss';
import useFavorites from '@/api/hooks/useFavorite';
import { EFavoriteActionType } from '@/utils';

const FavoritesContent: React.FC = () => {
  const { data: favorites, isLoading, isError, message } = useGetFavorites();
  const {
    executeFavoriteAction,
    isError: deleteError,
    notificationMsg: deleteNotificationMsg,
  } = useFavorites(EFavoriteActionType.DELETE_ALL);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationSuccess, setNotificationSuccess] = useState(false);

  const hasFavorites = favorites && favorites.length > 0;

  const handleDeleteAll = async () => {
    await executeFavoriteAction();
    setNotificationSuccess(true);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.block}>
          <div className={styles.titles}>
            <div className={styles.titleBlock}>
              <img src="/icons/favoritesIcon.svg" alt="" width={44} height={44} />
              <h1>Favorites</h1>
            </div>
          </div>
        </div>

        {isLoading && <Loading />}
        {isError && <ErrorFetch message={message} />}
        {deleteError && <ErrorFetch message={deleteNotificationMsg} />}

        {!isLoading && !isError && hasFavorites ? (
          <>
            <div className={styles.info}>
              <button type="button" className={styles.btnDel} onClick={handleDeleteAll}>
                <img src="/icons/deleteIcon.svg" alt="" width={20} height={20} />
                <span>Delete all</span>
              </button>
              <div className={styles.count}>{`${favorites.length} recipes`}</div>
            </div>
            <RecipesCardsList cards={favorites} isLoading={isLoading} isError={isError} msg={message} />
          </>
        ) : (
          !isLoading && !isError && <NothingMessage text={message || ''} />
        )}

        {showNotification && <Notification isSuccess={notificationSuccess} msg={deleteNotificationMsg} />}
      </div>
    </section>
  );
};

export default FavoritesContent;
