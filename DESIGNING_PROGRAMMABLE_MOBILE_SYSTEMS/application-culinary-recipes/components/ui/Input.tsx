/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { PasswordHideIcon, PasswordShowIcon } from '../icons';
import { EInputType } from '@/utils';
import { Controller } from 'react-hook-form';

interface IInputProps {
  type: EInputType;
  placeholder?: string;
  icon?: React.ReactNode;
  isReadonly?: boolean;
  isRequired?: boolean;
  control: any;
  name: string;
  errors?: any;
}

const Input: React.FC<IInputProps> = ({
  type,
  placeholder,
  icon,
  control,
  name,
  errors,
  isReadonly = false,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const hasError = Boolean(errors?.[name]);

  return (
    <View className={`relative ${hasError && 'border-red'}`}>
      <View
        style={{ flexDirection: 'row', display: 'flex' }}
        className={`
          flex-row items-center px-3 py-2 border-b-2
          ${hasError ? 'border-red' : 'border-gray-300'}
        `}
      >
        {icon && <View className="mr-2">{icon}</View>}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`text-base flex-1 text-black ${isReadonly && 'text-gray-400'}`}
              placeholder={isRequired ? `${placeholder || ''}*` : placeholder}
              secureTextEntry={type === 'password' && !showPassword}
              editable={!isReadonly}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {type === 'password' && (
          <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
            {showPassword ? <PasswordHideIcon /> : <PasswordShowIcon />}
          </TouchableOpacity>
        )}
      </View>
      {hasError && <Text className="text-red text-xs mt-1">{errors?.[name]?.message}</Text>}
    </View>
  );
};

export default Input;
