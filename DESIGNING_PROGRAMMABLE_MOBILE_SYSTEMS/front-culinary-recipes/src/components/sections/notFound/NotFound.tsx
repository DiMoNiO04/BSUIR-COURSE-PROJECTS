import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { EButtonClass, EButtonSize, EUrls } from '@/utils';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>
            Sorry, the page you are looking for does not exist. Please check the URL or return to the main page.
          </p>
          <div className={styles.btns}>
            <Button text={'Back'} nameClass={EButtonClass.DEF} size={EButtonSize.LG} isLink={false} handle={goBack} />
            <Button
              text={'Main page'}
              nameClass={EButtonClass.DEF}
              size={EButtonSize.LG}
              isLink={true}
              linkUrl={EUrls.MAIN}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
