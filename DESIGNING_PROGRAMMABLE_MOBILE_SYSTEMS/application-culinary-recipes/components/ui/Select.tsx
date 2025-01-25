import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ArrowIcon } from '../icons';

export interface IOption {
  id: number;
  name: string;
}

interface ISelect {
  label?: string;
  value: string | number | null;
  onChange?: (value: string | number) => void;
  options?: IOption[] | null;
}

const Select: React.FC<ISelect> = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  useEffect(() => {
    if (options) {
      const selected = options.find((option) => option.id === value) || null;
      setSelectedOption(selected);
    }
  }, [value, options]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: IOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.id);
    }
  };

  return (
    <View className="relative w-60 z-10">
      {label && <Text className="mb-2 text-sm font-interMedium text-gray-700">{label}</Text>}
      <TouchableOpacity
        className="border border-gray-400 rounded px-3 py-2 flex-row justify-between items-center"
        onPress={handleToggle}
      >
        <Text className="text-gray-700 flex-1">{selectedOption ? selectedOption.name : 'Select an option'}</Text>
        <View className={`ml-2 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ArrowIcon />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{ maxHeight: 700 }}
          className={`absolute ${label ? 'top-20' : 'top-12'} w-full bg-white border border-gray-300 rounded shadow-lg`}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleOptionSelect(item)} className="px-3 py-2">
                <Text className={`${selectedOption?.id === item.id ? 'text-orange font-semibold' : 'text-gray'}`}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Select;
