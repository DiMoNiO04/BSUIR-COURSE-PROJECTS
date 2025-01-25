import React, { useState, useEffect } from 'react';
import { LikeIcon } from '@/components/icons';
import { Rating } from '@/components/elements';
import { EButtonType, EFavoriteActionType, EUrls } from '@/utils';
import styles from './RecipeTop.module.scss';
import { IAuthorRecipe } from '@/api';
import { Link } from 'react-router-dom';
import { useGetFavorites } from '@/api/hooks';
import useFavorites from '@/api/hooks/useFavorite';
import { useAuthToken } from '@/hooks';
import ERoles from '@/utils/enums/roles';

interface IRecipeTop {
  id: number;
  title: string;
  image: string;
  shortDescription: string;
  createdAt: string;
  author: IAuthorRecipe | undefined;
  category: string;
}

const RecipeTop: React.FC<IRecipeTop> = ({ id, title, category, author, createdAt, shortDescription, image }) => {
  const { token, role } = useAuthToken();
  const [isLiked, setIsLiked] = useState(false);
  const { data: favorites } = useGetFavorites();
  const { executeFavoriteAction, isError } = useFavorites(
    isLiked ? EFavoriteActionType.REMOVE : EFavoriteActionType.ADD,
    String(id)
  );

  useEffect(() => {
    if (favorites && favorites.some((favorite) => favorite.id === id)) {
      setIsLiked(true);
    }
  }, [favorites, id]);

  const handleLikeClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await executeFavoriteAction();

    if (!isError) {
      setIsLiked(!isLiked);
    }
  };

  return (
    <div className={styles.top}>
      <div className={styles.panel}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.panelBnts}>
          {token && role === ERoles.USER && (
            <button type={EButtonType.BUTTON} className={styles.btnLike} onClick={handleLikeClick}>
              <LikeIcon color={isLiked ? '#ff642f' : '#8B8D95'} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.desc}>
        {author && (
          <div className={styles.author}>
            <img src="/icons/profile.svg" width={32} height={32} alt="Profile" />
            <span>
              {author?.firstName} {author?.lastName}
            </span>
          </div>
        )}
        <div className={styles.calendar}>
          <img src="/icons/calendar.svg" width={16} height={16} alt="Calendar" />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <Rating rating={5} />
        <div className={styles.category}>
          <b>Category:</b>
          <Link to={`${EUrls.CATEGORIES}/${category.toLowerCase()}/`}>{category}</Link>
        </div>
      </div>
      <p className={styles.description}>{shortDescription}</p>
      <div className={styles.img}>
        <img src={image} width={1100} height={630} alt={title} />
      </div>
    </div>
  );
};

export default RecipeTop;
