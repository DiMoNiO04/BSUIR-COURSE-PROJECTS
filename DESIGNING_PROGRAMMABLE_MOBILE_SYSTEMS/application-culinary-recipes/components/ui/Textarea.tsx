/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { Controller } from 'react-hook-form';

interface ITextareaProps {
  placeholder?: string;
  isReadonly?: boolean;
  isRequired?: boolean;
  control: any;
  name: string;
  errors?: any;
  isLabelSemicolon?: boolean;
}

const Textarea: React.FC<ITextareaProps> = ({
  placeholder,
  control,
  name,
  errors,
  isReadonly = false,
  isRequired = false,
  isLabelSemicolon = false,
}) => {
  const [text, setText] = useState('');
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
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={isRequired ? `${placeholder}*` : placeholder}
              editable={!isReadonly}
              multiline
              numberOfLines={10}
              value={value || text}
              onBlur={onBlur}
              onChangeText={(text) => {
                setText(text);
                onChange(text);
              }}
              className={`text-base flex-1 text-black ${isReadonly && 'text-gray-400'}`}
            />
          )}
        />
      </View>

      {isLabelSemicolon && (
        <Text className="text-orange text-xs italic mt-2">For a separating point, use the symbol ;</Text>
      )}

      {hasError && <Text className="text-red text-xs mt-1">{errors?.[name]?.message}</Text>}
    </View>
  );
};

export default Textarea;
