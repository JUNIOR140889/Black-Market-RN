import clsx from 'clsx';
import { styled } from 'nativewind';
import { TextInput as NTextInput } from 'react-native-paper';
import type { ComponentProps, ReactNode } from 'react';
import { type TextInput as TextInpuType } from 'react-native';
import colors from '../../theme/colors';
import { forwardRef, useState } from 'react';

import { View } from './view';
import { Text, textVariants } from './text';
import { type IconName } from '../icon';
import icons from '../../assets/icons';

const STextInput = styled(NTextInput, {
  classProps: ['contentStyle'],
});

export type NInputProps = Omit<
  ComponentProps<typeof NTextInput>,
  'error' | 'right' | 'contentStyle'
> & {
  error?: string | boolean;
  right?: IconName | ReactNode;
  inputClassName?: string;
  displayErrorMessage?: boolean;
  contentStyle?: string;
  className?: string;
};

export const TextInput = forwardRef<TextInpuType, NInputProps>(
    (
      {
        className,
        secureTextEntry,
        error,
        inputClassName,
        displayErrorMessage = true,
        right,
        ...props
      },
      ref,
    ) => {
      const [isObscure, setIsObscure] = useState(true);
      const obscureIcon: IconName = isObscure ? 'eye-off' : 'eye';
  
      return (
        <View className={clsx('rounded-lg', className)}>
          <STextInput
            ref={ref}
            mode="outlined"
            className={clsx(`${textVariants.body1} bg-white rounded-lg ${inputClassName}`)}
            theme={{
              colors: {
                primary: colors.primary[500],
                error: colors.danger[900],
              },
            }}
            textColor={colors.black}
            placeholderTextColor={colors.neutral[900]}
            secureTextEntry={secureTextEntry && isObscure}
            error={!!error}
            right={
              secureTextEntry ? (
                <NTextInput.Icon
                  size={16}
                  icon={icons[obscureIcon]()}
                  color={error ? colors.danger[900] : colors.black}
                  onPress={() => setIsObscure(prevState => !prevState)}
                />
              ) : typeof right === 'string' ? (
                <NTextInput.Icon
                  size={16}
                  icon={icons[right as IconName]()}
                  color={error ? colors.danger[900] : colors.black}
                />
              ) : error ? (
                <NTextInput.Icon
                  size={16}
                  icon={icons['alert-circle']()}
                  color={colors.danger[900]}
                />
              ) : (
                right
              )
            }
            {...props}
          />
  
          {error && typeof error === 'string' && displayErrorMessage && (
            <Text variant="body1" className="text-danger-900">
              {error}
            </Text>
          )}
        </View>
      );
    },
  );
  