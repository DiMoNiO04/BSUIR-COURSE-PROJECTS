/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { convertImageToBase64 } from '@/utils/functions';
import { UseFormSetValue } from 'react-hook-form';

const useFileInput = (setValue: UseFormSetValue<any>, trigger: () => Promise<boolean>) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const preview = await convertImageToBase64(file);
      setFilePreview(preview);

      setValue('image', preview);
      await trigger();
    }
  };

  return {
    filePreview,
    handleFileSelect,
    setFilePreview,
  };
};

export default useFileInput;
