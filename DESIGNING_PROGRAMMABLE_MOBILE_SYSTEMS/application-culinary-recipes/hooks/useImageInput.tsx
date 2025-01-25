import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import convertImageBase64 from '@/utils/functions/convertImageBase64';

const useImageInput = () => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need access to your photos to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return;

    const { uri } = result.assets[0];
    setFilePreview(uri);

    try {
      const base64Uri = await convertImageBase64(uri);
      setBase64Image(base64Uri);
    } catch (err) {
      console.error('Error converting to Base64:', err);
      Alert.alert('Error', 'Failed to process the image.');
    }
  };

  return {
    filePreview,
    base64Image,
    handleImagePick,
  };
};

export default useImageInput;
