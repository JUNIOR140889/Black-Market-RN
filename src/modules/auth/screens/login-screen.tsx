import { useSignIn } from '../../../api/signin';
import { TouchableOpacity } from 'react-native'
import { Image, Text, View, ImageBackground, SafeAreaView, Button, TextInput } from '../../../ui/core'
import images from '../../../ui/assets/images';
import type { AuthStackScreenProps } from '../../../navigation/types';
import { useEffect, useState } from 'react';
import {
  CardNotification,
  hideNotification,
  showNotification,
} from '../../../ui/core/notifications/card-notification';
import { signIn } from '../../../core';
import { common } from '../../../translations/en.json'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(true)

type ScreenProps = AuthStackScreenProps<'Login'>;

export type UserRequest = {
  email: string,
  password: string
}

export const LoginScreen = ({ navigation: { navigate } }: ScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
    const { mutate } = useSignIn();
    const handle = () => {
      hideNotification();
  
      const request = { user: {email: email, password: password}};
  
      if (email === '' || password === '') {
        showNotification({
          type: 'error',
          data: {
            title: common.errors.empty_input,
          }
        })
        console.log('email invalido')
        return  
      }

      if (!email.includes('@')) {
        showNotification({
          type: 'error',
          data: {
            title: common.errors.invalid_email,
          }
        })
        console.log('email invalido')
        return
      }

      mutate(request, {
        onSuccess: response => {
          console.log('success')
          signIn(response);
          showNotification({
            type: 'info',
            data: {
              title: common.success.login_success,
            },
          });
        },
        onError: error => {
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
    <ImageBackground className='flex-1' resizeMode='stretch' source={images.backgroundAuth()}>
      <View className='p-8 pt-16 gap-4'>
        <View className='rounded-lg bg-white px-6 pt-8 pb-4 items-center' >
          <Image source={images.logoBlackMarket()} className='h-8 w-48'></Image>
          <View className='w-full mt-8'>
            <Text variant='body1-small' className='mt-4'>{common.labels.email}</Text>
            <TextInput autoCapitalize='none' value={email} onChangeText={setEmail} placeholder={common.place_holders.email_input}></TextInput>
            <Text variant='body1-small' className='mt-4'>{common.labels.password}</Text>
            <TextInput autoCapitalize='none' value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={common.place_holders.email_input } ></TextInput>
          </View>
          <CardNotification style={{marginTop:10,  height: 50}} />
          <Button
          variant='primary'
          size='large'
          className='mt-4'
          label='Log In'
          onPress={() => handle()}
          >
          </Button>
          <TouchableOpacity>
            <Text className='mt-4 text-primary-800'>{common.labels.forgot_password}</Text>
          </TouchableOpacity>
        </View>
        <View className='rounded-lg bg-white items-center px-6 py-4'>
          <Text variant='body1'>{common.labels.without_account}</Text>
          <Button variant='primary-inverted' size='large' className='mt-4' label={common.labels.sign_up} onPress={() => navigate("SignUp")} ></Button>
        </View>
      </View>
    </ImageBackground>
  )
}