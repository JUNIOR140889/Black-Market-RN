import clsx from 'clsx';
import { styled } from 'nativewind';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import { type TextInput } from 'react-native';
import { TextInput as NTextInput } from 'react-native-paper';

import icons from '../../assets/icons';
import colors from '../../theme/colors';
import { type IconName } from '../icon';
import { Text, textVariants } from '../text';
import { View } from '../view';

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

export const Input = forwardRef<TextInput, NInputProps>(
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
      <View className={clsx('g-1', className)}>
        <STextInput
          ref={ref}
          mode="outlined"
          className={clsx(`${textVariants.body1} bg-white ${inputClassName} justify-center`)}
          theme={{
            fonts: {
              regular: {
                fontFamily: 'Poppins',
              },
            },
            colors: {
              primary: colors.black,
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
                size={24}
                icon={icons[obscureIcon]()}
                color={error ? colors.danger[900] : colors.black}
                onPress={() => setIsObscure(prevState => !prevState)}
              />
            ) : typeof right === 'string' ? (
              <NTextInput.Icon
                size={24}
                icon={icons[right as IconName]()}
                color={error ? colors.danger[900] : colors.black}
              />
            ) : error ? (
              <NTextInput.Icon
                size={24}
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
          <Text variant="caption" className="pl-3 text-danger-900">
            {error}
          </Text>
        )}
      </View>
    );
  },
);
