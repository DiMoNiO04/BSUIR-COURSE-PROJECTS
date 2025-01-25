import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface IBurgerBtnProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerBtn: React.FC<IBurgerBtnProps> = ({ isOpen, onClick }) => {
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isOpen) {
      rotation.value = withTiming(45, { duration: 300, easing: Easing.ease });
      translateX.value = withTiming(6, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(7, { duration: 300, easing: Easing.ease });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
    } else {
      rotation.value = withTiming(0, { duration: 300, easing: Easing.ease });
      translateX.value = withTiming(0, { duration: 300, easing: Easing.ease });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.ease });
      opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
    }
  }, [isOpen]);

  const animatedStyleTop = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const animatedStyleMiddle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedStyleBottom = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${-rotation.value}deg` },
        { translateX: translateX.value },
        { translateY: -translateY.value },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={onClick} className="flex flex-col gap-y-2 justify-around items-center w-8 h-6">
      <Animated.View style={[animatedStyleTop, { width: '100%', height: 2, backgroundColor: 'black' }]} />
      <Animated.View style={[animatedStyleMiddle, { width: '100%', height: 2, backgroundColor: 'black' }]} />
      <Animated.View style={[animatedStyleBottom, { width: '100%', height: 2, backgroundColor: 'black' }]} />
    </TouchableOpacity>
  );
};

export default BurgerBtn;
