import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { EButtonClass, EButtonSize } from '@/utils';

interface IButtonProps {
  text: string;
  nameClass: EButtonClass;
  size: EButtonSize;
  isLink?: boolean;
  linkUrl?: string;
  isExternal?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  text,
  nameClass,
  size,
  isLink = false,
  linkUrl,
  isExternal = false,
  isDisabled = false,
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (isDisabled) return;

    if (isLink && linkUrl) {
      if (isExternal) {
        Linking.openURL(linkUrl);
      } else {
        router.push(linkUrl as RelativePathString);
      }
    } else if (onPress) {
      onPress();
    }
  };

  const buttonClasses = `
    ${nameClass === EButtonClass.DEF ? 'bg-white border-black text-black' : 'bg-orange border-orange text-white'}
    ${size === EButtonSize.LG ? 'px-6 py-3' : 'px-4 py-2'}
    ${isDisabled ? 'opacity-50' : ''}
    border rounded-lg text-center
  `;

  return (
    <TouchableOpacity className={buttonClasses} onPress={handlePress} disabled={isDisabled}>
      <Text
        style={{ color: `${EButtonClass.DEF === nameClass ? 'black' : 'white'}`, textAlign: 'center' }}
        className="font-interMedium"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
