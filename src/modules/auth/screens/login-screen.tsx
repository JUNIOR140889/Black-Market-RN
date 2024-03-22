import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useSignIn } from '../../../api/signin';
import { signIn } from '../../../core';
import type { AuthStackScreenProps } from '../../../navigation/types';
import { common } from '../../../translations/en.json';
import images from '../../../ui/assets/images';
import { Button, Image, ImageBackground, Text, TextInput, View } from '../../../ui/core';
import {
  CardNotification,
  hideNotification,
  showNotification,
} from '../../../ui/core/notifications/card-notification';

type ScreenProps = AuthStackScreenProps<'Login'>;

export type UserRequest = {
  email: string;
  password: string;
};

export const LoginScreen = ({ navigation: { navigate } }: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useSignIn();
  const handle = () => {
    hideNotification();
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const request = { user: { email: email, password: password } };

    if (email === '' || password === '') {
      showNotification({
        type: 'error',
        data: {
          title: common.errors.empty_input,
        },
      });
      return;
    }
    if (!validateEmail(email)) {
      showNotification({
        type: 'error',
        data: {
          title: common.errors.invalid_email,
        },
      });
      return;
    }
    mutate(request, {
      onSuccess: response => {
        signIn(response);
        showNotification({
          type: 'info',
          data: {
            title: common.success.login_success,
          },
        });
        navigate('Main');
      },
      onError: () => {
        showNotification({
          type: 'error',
          data: {
            title: common.errors.credentials,
          },
        });
      },
    });
  };

  return (
    <ImageBackground className="flex-1" resizeMode="stretch" source={images.backgroundAuth()}>
      <View className="gap-4 p-8 pt-16">
        <View className="items-center rounded-lg bg-white px-6 pb-4 pt-8">
          <Image source={images.logoBlackMarket()} className="h-8 w-48" />
          <View className="mt-8 w-full">
            <Text variant="body1-small" className="mt-4">
              {common.labels.email}
            </Text>
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholder={common.place_holders.email_input}
            />
            <Text variant="body1-small" className="mt-4">
              {common.labels.password}
            </Text>
            <TextInput
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder={common.place_holders.password_input}
            />
          </View>
          <CardNotification className="-mb-1 mt-2" />
          <Button
            variant="primary"
            size="large"
            className="mt-4"
            label="Log In"
            onPress={() => {
              handle();
            }}
          />
          <TouchableOpacity>
            <Text className="mt-4 text-primary-800">{common.labels.forgot_password}</Text>
          </TouchableOpacity>
        </View>
        <View className="items-center rounded-lg bg-white px-6 py-4">
          <Text variant="body1">{common.labels.without_account}</Text>
          <Button
            variant="primary-inverted"
            size="large"
            className="mt-4"
            label={common.labels.sign_up}
            onPress={() => navigate('SignUp')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
