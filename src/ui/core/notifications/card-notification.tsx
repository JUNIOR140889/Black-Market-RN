import { styled } from 'nativewind';
import { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import { create } from 'zustand';

import type { CardProps } from '../card';
import { Card } from '../card';

type Data = Omit<CardProps, 'variant'>;
type Variant = CardProps['variant'];

type Notification = {
  type: Variant;
  data?: Data;
};

const useNotificationStore = create<
  Notification & {
    set: (notification: { type: Variant; data?: Data }) => void;
  }
>(set => ({
  type: 'default',
  data: {},
  set: ({ type, data }) => set({ type, data }),
}));

export const CardNotification = styled<ViewProps>(props => {
  const variant = useNotificationStore(state => state.type);
  const { title, message, leftIcon, rightIcon } = useNotificationStore(state => state.data) || {};

  useEffect(() => {
    hideNotification();

    return hideNotification;
  }, []);

  if (!title && !message) return null;

  return (
    <Card
      variant={variant}
      title={title}
      message={message}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...props}
    />
  );
});

export const showNotification = (notifcation: Notification) =>
  useNotificationStore.getState().set(notifcation);

export const hideNotification = () =>
  useNotificationStore.getState().set({
    type: 'default',
  });
