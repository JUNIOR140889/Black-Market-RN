import clsx from 'clsx';
import { styled } from 'nativewind';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { type FieldValues } from 'react-hook-form';
import type { LayoutChangeEvent, TextInput as NTextInput } from 'react-native';
import { Divider, Menu } from 'react-native-paper';

import type { InputControllerType } from './input';
import { ControlledInput } from './input';
import { Pressable, ScrollView, TouchableOpacity, View } from './view';

type Item = {
  label: string;
  value: string | number;
};

export type DropDownProps<T extends FieldValues> = {
  visible: boolean;
  onDismiss: () => void;
  showDropDown: () => void;
  value: any;
  setValue: (_value: any) => void;
  label?: string;
  list: Array<Item>;
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  dropDownPlaceholder?: string;
} & InputControllerType<T>;

const MenuItem = styled(Menu.Item, {
  classProps: ['style', 'titleStyle'],
  props: {
    style: true,
    titleStyle: true,
  },
});

export const Dropdown = <T extends FieldValues>(props: DropDownProps<T>) => {
  const { visible, onDismiss, showDropDown, value, setValue, label, list, ...rest } = props;

  const { dropDownContainerMaxHeight, dropDownContainerHeight, dropDownPlaceholder } = props;

  const [displayValue, setDisplayValue] = useState('');
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout);
  };

  useEffect(() => {
    const _label = list.find(item => item.value === value)?.label;

    if (_label) {
      setDisplayValue(_label);
    }
  }, [list, value]);

  const isActive = useCallback((currentValue: Item['value']) => value === currentValue, [value]);

  const setActive = useCallback(
    (currentValue: Item['value']) => setValue(currentValue),
    [setValue],
  );

  const inputRef = useRef<NTextInput>(null);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }, [visible]);

  return (
    <Menu
      visible={visible}
      onDismiss={onDismiss}
      anchor={
        <Pressable onPress={showDropDown} onLayout={onLayout}>
          <View pointerEvents="none">
            <ControlledInput
              placeholder={dropDownPlaceholder}
              ref={inputRef}
              value={displayValue}
              label={label}
              pointerEvents="none"
              right={visible ? 'chevron-up' : 'chevron-down'}
              showSoftInputOnFocus={false}
              caretHidden
              {...rest}
            />
          </View>
        </Pressable>
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height,
      }}>
      <ScrollView
        bounces={false}
        style={{
          ...(dropDownContainerHeight
            ? {
                height: dropDownContainerHeight,
              }
            : {
                maxHeight: dropDownContainerMaxHeight || 200,
              }),
        }}>
        {list.map(({ value: _value, label: _label }, _index) => (
          <Fragment key={_value}>
            <TouchableOpacity
              className={clsx(isActive(_value) ? 'bg-primary-50 ' : '')}
              onPress={() => {
                setActive(_value);
                onDismiss();
              }}>
              <MenuItem className="h-[56px]" titleStyle="font-primary" title={_label} />
            </TouchableOpacity>
            <Divider />
          </Fragment>
        ))}
      </ScrollView>
    </Menu>
  );
};
