import { styled } from 'nativewind';
import React, { useState } from 'react';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';

import { Text } from '../../ui/core/text';
import { View } from '../../ui/core/view';

const Dropdown = styled(RNDropdown);

interface DropdownComponentProps {
  quantity: number;
  onChange: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ quantity, onChange }) => {
  const [value, setValue] = useState('1');

  const data = Array.from({ length: quantity }, (_, index) => ({
    label: (index + 1).toString(),
    value: (index + 1).toString(),
  }));

  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View className="flex items-center justify-center p-4">
        <Text className="text-center text-base">{item.label}</Text>
      </View>
    );
  };

  return (
    <View className="flex justify-center">
      <Dropdown
        className="h-12 w-24 rounded-lg border border-black bg-white p-3 shadow-md"
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="1"
        value={value}
        onChange={(item: unknown) => {
          onChange((item as { value: string }).value);
          setValue((item as { value: string }).value);
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DropdownComponent;
