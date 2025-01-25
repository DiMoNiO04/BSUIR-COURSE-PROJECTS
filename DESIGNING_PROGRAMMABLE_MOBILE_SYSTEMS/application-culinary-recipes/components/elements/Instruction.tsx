import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { splitBySemicolon } from '@/utils/functions';

interface IInstruction {
  instructions: string;
}

const Instruction: React.FC<IInstruction> = ({ instructions }) => {
  if (!instructions) return null;

  const instructionList = splitBySemicolon(instructions);

  return (
    <View className="px-4">
      <Text className="text-2xl font-bold text-black mb-4">Instructions</Text>
      <FlatList
        data={instructionList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-start gap-x-2 mb-4">
            <View className="w-2 h-2 bg-orange rounded-full mt-2" />
            <Text className="font-interRegular text-gray">{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Instruction;
