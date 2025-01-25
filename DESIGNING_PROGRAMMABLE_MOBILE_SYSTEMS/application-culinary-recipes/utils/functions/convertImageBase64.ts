import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const convertImageBase64 = async (uri: string): Promise<string> => {
  if (Platform.OS === 'web') {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to Base64 (web):', error);
      throw new Error('Failed to convert image to Base64');
    }
  } else {
    try {
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      console.error('Error converting image to Base64 (native):', error);
      throw new Error('Failed to convert image to Base64');
    }
  }
};

export default convertImageBase64;
