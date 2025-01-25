import React, { useState } from 'react';
import styles from './ModerRecipeCard.module.scss';
import { IRecipe } from '@/api';
import { Link } from 'react-router-dom';
import { EActionType, EUrls } from '@/utils';
import { useRecipe, useTogglePublishRecipe } from '@/api/hooks';
import { ConfirmAction } from '@/components/modals';
import { Notification } from '@/components/ui';
import { DeleteIcon } from '@/components/icons';

const ModerRecipeCard: React.FC<IRecipe> = ({ id, image, title, isPublished }) => {
  const { handleTogglePublish } = useTogglePublishRecipe();
  const { submitRecipe: deleteRecipe, isError, notificationMsg } = useRecipe(EActionType.DELETE, id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await handleTogglePublish(id);
  };

  const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => setIsModalOpen(false);

  const handleConfirmDelete = async () => {
    await deleteRecipe();
    closeDeleteModal();
  };

  return (
    <>
      <Link to={`${EUrls.RECIPE}/${id}/`} className={`${styles.card} ${!isPublished && styles.noPublish}`}>
        <div className={styles.img}>
          <img src={image} alt={title} width={350} height={265} />
        </div>
        <div className={styles.name}>{title}</div>

        <div className={styles.actions}>
          <button onClick={openDeleteModal} className={styles.deleteButton}>
            <DeleteIcon />
          </button>
          {isPublished ? (
            <button onClick={handleToggle} className={styles.unpublishButton}>
              Unpublish
            </button>
          ) : (
            <button onClick={handleToggle} className={styles.publishButton}>
              Publish
            </button>
          )}
        </div>
      </Link>

      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete the recipe '${title}'?`}
      />

      {notificationMsg && <Notification isSuccess={!isError} msg={notificationMsg} />}
    </>
  );
};

export default ModerRecipeCard;
