import React, { useState } from 'react';
import styles from './CategorieModerCard.module.scss';
import { ICategory } from '@/api';
import { EActionType, EButtonType, EUrls } from '@/utils';
import { DeleteIcon, EditIcon } from '@/components/icons';
import { Link } from 'react-router-dom';
import { ConfirmAction } from '@/components/modals';
import { Notification } from '@/components/ui';
import { useCategorie } from '@/api/hooks';

const CategorieModerCard: React.FC<ICategory> = ({ name, image, countrecipes }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { submitCategorie: deleteCategorie, isError, notificationMsg } = useCategorie(EActionType.DELETE, name);

  const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeDeleteModal = () => setIsModalOpen(false);

  const handleConfirmDelete = async () => {
    await deleteCategorie();
    closeDeleteModal();
  };

  return (
    <>
      <Link to={`${EUrls.CATEGORIES}/${name.toLowerCase()}/`} className={styles.card}>
        <div className={styles.img}>
          <img src={image} alt={name} width={255} height={255} />
        </div>
        <div className={styles.name}>{name}</div>
        <span className={styles.count}>{countrecipes} recipes</span>
        <div className={styles.btns}>
          <button type={EButtonType.BUTTON} className={styles.btn} onClick={openDeleteModal}>
            <DeleteIcon />
          </button>
          <Link to={`${EUrls.UPDATE_CATEGORIE}/${name.toLowerCase()}`} type={EButtonType.BUTTON} className={styles.btn}>
            <EditIcon />
          </Link>
        </div>
      </Link>

      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete this category '${name}' and all her recipes?`}
      />

      {notificationMsg && <Notification isSuccess={!isError} msg={notificationMsg} />}
    </>
  );
};

export default CategorieModerCard;
