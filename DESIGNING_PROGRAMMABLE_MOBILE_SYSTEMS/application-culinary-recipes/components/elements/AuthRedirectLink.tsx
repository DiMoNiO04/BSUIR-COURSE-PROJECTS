import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface AuthRedirectLinkProps {
  message: string;
  linkText: string;
  onPress: () => void;
}

const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({ message, linkText, onPress }) => {
  return (
    <Text className="text-center flex-row items-center">
      {message}{' '}
      <TouchableOpacity onPress={onPress}>
        <Text className="text-orange">{linkText}</Text>
      </TouchableOpacity>
    </Text>
  );
};

export default AuthRedirectLink;
