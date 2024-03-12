import clsx from 'clsx';
import type { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import colors from '../theme/colors';
import { Icon, type IconName } from './icon';
import { Text } from './text';
import { View } from './view';

const cardVariants = {
  default: {
    container: 'bg-primary-100/30',
    title: 'text-primary-900',
    message: 'text-primary-500',
    left: colors.primary[500],
    right: colors.primary[500],
  },
  error: {
    container: 'bg-danger-100',
    title: 'text-danger-900 text-base',
    message: 'text-danger-900',
    left: colors.danger[900],
    right: colors.danger[900],
  },
  info: {
    container: 'bg-info-100',
    title: 'text-info-900',
    message: 'text-info-900',
    left: colors.info[900],
    right: colors.info[900],
  },
  warning: {
    container: 'bg-warning-100',
    title: 'text-warning-900',
    message: 'text-warning-900',
    left: colors.warning[900],
    right: colors.warning[900],
  },
} satisfies Record<string, Record<string, string>>;

type VariantName = keyof Omit<typeof cardVariants, 'defaults'>;

const icons: Record<VariantName, IconName> = {
  default: 'x-circle',
  error: 'x-circle',
  info: 'info-circle',
  warning: 'alert-triangle',
};

export type CardProps = {
  variant?: VariantName;
  title?: string;
  message?: string;
  leftIcon?: IconName;
  leftIconSize?: number;
  rightIcon?: IconName;
  rightIconSize?: number;
} & ViewProps;

export const Card = ({
  variant = 'default',
  title,
  message,
  leftIcon,
  leftIconSize,
  rightIcon,
  rightIconSize,
  ...props
}: CardProps) => {
  const styles = cardVariants[variant];
  const _leftIcon = leftIcon ?? icons[variant];

  return (
    <View
      className={clsx('flex-row items-center rounded-[4px] p-2 pl-4 g-4', styles.container)}
      {...props}>
      {_leftIcon && <Icon size={leftIconSize ?? 20} name={_leftIcon} tintColor={styles.left} />}
      <View className="flex-1 g-1">
        {!!title && (
          <Text variant="body2-bold" className={styles.title}>
            {title}
          </Text>
        )}
        {!!message && (
          <Text variant="caption" className={styles.message}>
            {message}
          </Text>
        )}
      </View>
      {rightIcon && <Icon size={rightIconSize ?? 20} name={rightIcon} tintColor={styles.right} />}
    </View>
  );
};
