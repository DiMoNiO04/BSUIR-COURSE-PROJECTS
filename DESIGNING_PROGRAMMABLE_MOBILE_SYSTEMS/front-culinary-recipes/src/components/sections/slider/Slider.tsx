import React from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { slides } from '@/data';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import styles from './Slider.module.scss';

const Slider: React.FC = () => {
  const renderSlides = () =>
    slides.map(({ id, title, description, img }) => (
      <SwiperSlide key={id} className={styles.slide}>
        <div>
          <div className={styles.img}>
            <img src={img} alt={title} width={1440} height={634} />
          </div>
          <div className={styles.info}>
            <div className={styles.description}>
              <img src={'/icons/trendingUp.svg'} alt="Trending Up" width={20} height={20} />
              <span>{description}</span>
            </div>
            {id === 1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <section className={styles.section}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.nextButtonSlider',
            prevEl: '.prevButtonSlider',
          }}
          speed={700}
          // autoplay={{ delay: 4000 }} // Раскомментируйте, если нужна автопрокрутка
          className={styles.swiper}
        >
          {renderSlides()}
        </Swiper>

        <div className={styles.btns}>
          <button className="prevButtonSlider" aria-label="Предыдущий слайд">
            <img src={'/icons/arrowLeft.svg'} alt="Prev" width={16} height={16} />
          </button>
          <button className="nextButtonSlider" aria-label="Следующий слайд">
            <img src={'/icons/arrowRight.svg'} alt="Next" width={16} height={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
