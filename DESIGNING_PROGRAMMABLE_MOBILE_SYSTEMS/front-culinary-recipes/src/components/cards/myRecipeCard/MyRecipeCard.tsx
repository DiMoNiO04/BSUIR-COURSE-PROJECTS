import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '@/api';
import { EActionType, EButtonType, EUrls } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { ConfirmAction } from '@/components/modals';
import { Notification } from '@/components/ui';
import styles from './MyRecipeCard.module.scss';
import { useRecipe } from '@/api/hooks';

const MyRecipeCard: React.FC<IRecipe> = ({ title, image, id, isPublished }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { submitRecipe: deleteRecipe, isError, notificationMsg } = useRecipe(EActionType.DELETE, id);

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
        <div className={styles.btns}>
          <button type={EButtonType.BUTTON} className={styles.btn} onClick={openDeleteModal}>
            <DeleteIcon />
          </button>
          <Link to={`${EUrls.UPDATE_RECIPE}/${id}`} type={EButtonType.BUTTON} className={styles.btn}>
            <EditIcon />
          </Link>
        </div>
        <div className={styles.img}>
          <img src={image} alt={title} width={350} height={265} />
        </div>
        <div className={styles.name}>{title}</div>
        {!isPublished && <span className={styles.moder}>It is currently under moderation</span>}
      </Link>

      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete this recipe '${title}'?`}
      />

      {notificationMsg && <Notification isSuccess={!isError} msg={notificationMsg} />}
    </>
  );
};

export default MyRecipeCard;
