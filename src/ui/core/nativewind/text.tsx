import { styled } from 'nativewind';
import { Text as RNText } from 'react-native';
import type { TextProps } from 'react-native';
import clsx from 'clsx';

const SText = styled(RNText);

interface Props extends TextProps {
    variant?: keyof typeof textVariants;
    className?: string;
  }
export const textVariants = {
    'body1-small': 'font-primary text-[14px] font-normal',
    body1: 'font-primary text-[16px] font-normal',
  };

  export const Text = ({
    variant = 'body1',
    className = '',
    children,
    ...props
  }: Props) => {
    const content = children;
  
    return (
      <SText
        className={clsx(textVariants[variant], className)}
        {...props}>
        {content}
      </SText>
    );
  };
  