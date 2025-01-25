import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { CloseIcon } from '../icons';

interface IModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isError?: boolean;
}

const CustomModal: React.FC<IModalProps> = ({ isModalOpen, onClose, title, children, isError }) => {
  return (
    <Modal animationType="fade" transparent visible={isModalOpen} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View
          className={`bg-white w-11/12 max-w-md rounded-lg py-10 px-6 shadow-lg ${isError ? 'border border-red' : ''}`}
        >
          <TouchableOpacity onPress={onClose} className="absolute top-1 right-1 p-2">
            <CloseIcon />
          </TouchableOpacity>

          <Text className="text-2xl font-playfairBold text-black mb-4">{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
