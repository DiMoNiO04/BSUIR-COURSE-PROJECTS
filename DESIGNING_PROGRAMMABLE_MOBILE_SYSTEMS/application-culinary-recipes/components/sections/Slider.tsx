import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ArrowIcon, TrendingUpIcon } from '../icons';
import { slides } from '@/data';

const { width } = Dimensions.get('window');

const Slider: React.FC = () => {
  const swiperRef = useRef<SwiperFlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderSlides = () =>
    slides.map(({ id, title, description, img }) => (
      <View key={id} style={{ width, height: 480 }} className="relative mb-16">
        <Image source={img} style={{ width, height: 480 }} className="absolute top-0 left-0 object-cover" />
        <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
        <View className="absolute bottom-20 left-5 right-5 mx-auto max-w-[1140px]">
          <View className="flex-row items-center gap-x-2 mb-1">
            <TrendingUpIcon color="#FFFFFF" />
            <Text className="text-white text-base">{description}</Text>
          </View>
          {id === 1 ? (
            <Text className="text-white font-bold text-5xl">{title}</Text>
          ) : (
            <Text className="text-white font-bold text-3xl">{title}</Text>
          )}
        </View>
      </View>
    ));

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    swiperRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentIndex(prevIndex);
  };

  const goToNext = () => {
    const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    swiperRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handleChangeIndex = ({ index }: { index: number }) => {
    setCurrentIndex(index);
  };

  return (
    <View className="relative w-full">
      <SwiperFlatList ref={swiperRef} autoplay autoplayDelay={5} autoplayLoop onChangeIndex={handleChangeIndex}>
        {renderSlides()}
      </SwiperFlatList>

      <View className="absolute top-1/2 -translate-y-1/2 w-full flex-row justify-between">
        <TouchableOpacity
          onPress={goToPrevious}
          style={{
            transform: [{ rotate: '90deg' }],
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="bg-white opacity-80"
        >
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNext}
          style={{
            transform: [{ rotate: '270deg' }],
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="bg-white opacity-80"
        >
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Slider;
