import { useSignIn } from '../../../api/signin';
import { TouchableOpacity } from 'react-native';
import { Image, Text, View, ImageBackground, Button, TextInput } from '../../../ui/core';
import images from '../../../ui/assets/images';
import type { AuthStackScreenProps } from '../../../navigation/types';
import { useState } from 'react';
import {
  CardNotification,
  hideNotification,
  showNotification,
} from '../../../ui/core/notifications/card-notification';
import { signIn } from '../../../core';
import { common } from '../../../translations/en.json';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(true);

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
      console.log('email invalido');
      return;
    }
    if (!validateEmail(email)) {
      showNotification({
        type: 'error',
        data: {
          title: common.errors.invalid_email,
        },
      });
      console.log('email invalido')
      return;
    }
    mutate(request, {
      onSuccess: response => {
        console.log('success');
        signIn(response);
        showNotification({
          type: 'info',
          data: {
            title: common.success.login_success,
          },
        });
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
          <Image source={images.logoBlackMarket()} className="h-8 w-48"></Image>
          <View className="mt-8 w-full">
            <Text variant="body1-small" className="mt-4">
              {common.labels.email}
            </Text>
            <TextInput
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholder={common.place_holders.email_input}></TextInput>
            <Text variant="body1-small" className="mt-4">
              {common.labels.password}
            </Text>
            <TextInput
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder={common.place_holders.password_input}></TextInput>
          </View>
          <CardNotification style={{marginTop:10,  height: 50}} />
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
            onPress={() => navigate('SignUp')}></Button>
        </View>
      </View>
    </ImageBackground>
  );
};
