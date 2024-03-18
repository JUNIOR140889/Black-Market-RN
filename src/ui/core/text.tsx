import clsx from 'clsx';
import { styled } from 'nativewind';
import React from 'react';
import type { TextProps } from 'react-native';
import { Text as RNText } from 'react-native';

import type { TxKeyPath } from '../../core';
import { translate } from '../../core';

const SText = styled(RNText);

interface Props extends TextProps {
  variant?: keyof typeof textVariants;
  className?: string;
  tx?: TxKeyPath;
}

export const textVariants = {
  h1: 'font-primary text-[42px] font-bold leading-[50.4px]',
  h2: 'font-primary text-[34px] font-bold leading-[42px] ',
  h3: 'font-primary text-[32px] font-normal leading-[45px]',
  h4: 'font-primary text-[28px] font-medium leading-[42px]',
  h5: 'font-primary text-[24px] font-normal leading-[36px]',
  h6: 'font-primary text-[20px] font-normal leading-[24.2px]',
  'h6-bold': 'font-primary text-[20px] font-semibold leading-[30px]',
  body1: 'font-primary text-[16px] font-normal leading-[24px] tracking-[0.08px]',
  'body1-bold': 'font-primary text-[16px] font-semibold leading-[24px] tracking-[0.08px]',
  body2: 'font-primary text-[14px] font-normal leading-[20px] tracking-[0.035px]',
  'body2-bold': 'font-primary text-[14px] font-semibold leading-[20px]',
  link: 'font-primary text-[14px] font-normal leading-[14px] underline',
  caption: 'font-primary text-[12px] font-normal leading-[14.52px]',
  overline: 'font-primary text-[10px] font-normal leading-[12.1px]',
};

export const Text = ({
  variant = 'body1',
  className = '',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const content = tx ? translate(tx) : children;

  return (
    <SText
      className={clsx('text-black', textVariants.body1, textVariants[variant], className)}
      style={style}
      {...props}>
      {content}
    </SText>
  );
};
