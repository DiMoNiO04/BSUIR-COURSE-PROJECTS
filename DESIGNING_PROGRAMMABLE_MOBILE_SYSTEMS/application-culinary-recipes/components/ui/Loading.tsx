import React from 'react';
import { View, Image } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center p-10">
      <Image
        source={require('../../assets/images/loading.gif')} // Используйте require для локальных файлов
        style={{ width: 120, height: 120 }}
      />
    </View>
  );
};

export default Loading;
