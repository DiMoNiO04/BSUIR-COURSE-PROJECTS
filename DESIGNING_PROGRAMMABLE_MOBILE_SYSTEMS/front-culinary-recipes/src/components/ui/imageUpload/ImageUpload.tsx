import React from 'react';
import { Button } from '@/components/ui';
import { EButtonClass, EButtonType, EButtonSize } from '@/utils';
import styles from './ImageUpload.module.scss';

interface ImageUploadProps {
  filePreview: string | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ filePreview, onFileSelect }) => {
  return (
    <div className={styles.fileInput}>
      <label htmlFor="image-upload" className={styles.labelWrapper}>
        <Button
          text="Upload Image"
          nameClass={EButtonClass.SEC}
          typeBtn={EButtonType.BUTTON}
          isLink={false}
          size={EButtonSize.LG}
        />
        <input type="file" accept="image/*" onChange={onFileSelect} className={styles.hiddenInput} id="image-upload" />
      </label>
      {filePreview && (
        <div className={styles.filePreview}>
          <img src={filePreview} alt="Preview" className={styles.imagePreview} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
