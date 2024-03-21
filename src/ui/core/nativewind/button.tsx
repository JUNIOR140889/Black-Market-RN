import clsx from "clsx";
import { type TouchableOpacityProps } from 'react-native';

import colors from '../../theme/colors';
import { ActivityIndicator } from "./activity-indicator";
import { Pressable } from './pressable';
import { Text } from "./text"
import { View } from "./view"

interface Props extends TouchableOpacityProps {
  label?: string;
  className?: string;
}

type Variant = {
  container: string;
  label: string;
  indicator: string;
  icon: string;
};

export const buttonVariants = {
  defaults: {
    container: 'flex-row items-center justify-center border',
    label: 'font-primary text-white',
    indicator: colors.white,
    icon: colors.white,
  },
  primary: {
    container: 'bg-primary-700 active:bg-primary-900 border-primary-700',
    label: 'text-white',
    indicator: '',
    icon: colors.white,
  },
  'primary-inverted': {
    container: 'bg-white active:bg-primary-900 border-primary-700',
    label: 'text-primary-900',
    indicator: '',
    icon: colors.primary[900],
  },
} satisfies Record<string, Variant>;

const disabledVariants = {
  primary: {
    container: 'bg-neutral-100',
    label: 'text-neutral-500',
    indicator: '',
    icon: colors.neutral[500],
  },
  'primary-inverted': {
    container: 'bg-neutral-100',
    label: 'text-neutral-500',
    indicator: '',
    icon: colors.neutral[500],
  },
} satisfies Record<ButtonVariant, Variant>;

const pressedVariants: Record<ButtonVariant, Pick<Variant, 'label' | 'icon'>> = {
  primary: {
    label: 'text-white',
    icon: colors.white,
  },
  'primary-inverted': {
    label: 'text-white',
    icon: colors.white,
  },
};

export const buttonSizes = {
  small: {
    container: 'px-[8px] py-[6px] rounded-[4px]',
    label: 'text-[14px] leading-[18px] font-normal tracking-[0.175px]',
  },
  medium: {
    container: 'px-[16px] py-[10px] rounded-[8px]',
    label: 'text-[14px] leading-[20px] font-normal',
  },
  large: {
    container: 'px-[16px] py-[12px] rounded-[8px]',
    label: 'text-[16px] leading-[24px] font-normal',
  },
} satisfies Record<string, Omit<Variant, 'indicator' | 'disabled' | 'icon'>>;

export type ButtonVariant = keyof Omit<typeof buttonVariants, 'defaults'>;
export type ButtonSize = keyof typeof buttonSizes;

interface Props extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  loading?: boolean;
  contentContainerClassName?: string;
  textClassName?: string;
}


export const Button = ({
  label,
  loading = false,
  variant = 'primary',
  disabled = false,
  size = 'medium',
  className,
  contentContainerClassName,
  textClassName,
  ...props
}: Props) => {
  return (
    <Pressable disabled={disabled || loading}
      className={clsx(
        buttonVariants.defaults.container,
        buttonVariants[variant].container,
        buttonSizes[size].container,
        disabled ? disabledVariants[variant].container : '',
        className, 'w-full',
      )}
      {...props}>
      {({ pressed }) =>
        loading ? (
          <ActivityIndicator
            size="small"
            color={buttonVariants.defaults.indicator}
            className="h-[24px]"
          />
        ) : (
          <View className={clsx('flex-row items-center justify-center', contentContainerClassName)}>
            <Text
              className={clsx(
              buttonVariants.defaults.label,
              buttonVariants[variant].label,
              buttonSizes[size].label,
              pressed ? pressedVariants[variant].label : '',
              disabled ? disabledVariants[variant].label : '',
              textClassName,
            )}>{label}</Text>
          </View>)}
    </Pressable>
  )
};
