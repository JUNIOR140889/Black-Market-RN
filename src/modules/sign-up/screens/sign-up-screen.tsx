import { Text, Image, View, ImageBackground, SafeAreaView, Button, TextInput } from '../../../ui/core'
import images from '../../../ui/assets/images';
import { TouchableOpacity } from 'react-native'
import type { AuthStackScreenProps } from '../../../navigation/types';
import { useState } from 'react';
import { useSignUp } from '../../../api/signup';
import { signIn } from '../../../core';
import { CardNotification, hideNotification, showNotification } from '../../../ui/core/notifications/card-notification';
import { common } from '../../../translations/en.json'
import { LogBox } from 'react-native';

type ScreenProps = AuthStackScreenProps<'SignUp'>;

export const SignUpScreen = ({ navigation: { navigate } }: ScreenProps) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { mutate } = useSignUp();

  const handleSignUp = () => {
    hideNotification()
    const request = { user: { email, name, password } };

    if (email === '' || password === '') {
      showNotification({
        type: 'error',
        data: {
          title: common.errors.empty_input,
        }
      })
      return  
    }

    if (!email.includes('@')) {
      showNotification({
        type: 'error',
        data: {
          title: common.errors.invalid_email,
        }
      })
      return
    }

    mutate(request, {
      onSuccess: response => {
        showNotification({
          type: 'info',
          data: {
            title: common.success.login_success,
          },
        });
        signIn(response);
      },
      onError: error => {
        showNotification({
          type: 'error',
          data: {
            title: common.errors.repeated_email
          }
        })
      },
    });
  };

  return (
    <ImageBackground className='flex-1' resizeMode='stretch' source={images.backgroundAuth()}>
      <View className='p-8 pt-16 gap-4'>
        <View className='rounded-lg bg-white px-6 pt-8 pb-4 items-center'>
          <Image source={images.logoBlackMarket()} className='h-8 w-48'></Image>
          <View className='w-full mt-8'>
            <Text variant='body1-small'>{common.labels.email}</Text>
            <TextInput autoCapitalize='none' value={email} onChangeText={setEmail} placeholder={common.place_holders.email_input}></TextInput>
            <Text variant='body1-small' className='mt-4'>{common.labels.name}</Text>
            <TextInput autoCapitalize='none' value={name} onChangeText={setName} placeholder={common.place_holders.name_input}></TextInput>
            <Text variant='body1-small' className='mt-4'>{common.labels.password}</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={common.place_holders.password_input}></TextInput>
          </View>
          <CardNotification style={{marginTop:10,  height: 50}}/>
          <Button variant='primary' size='large' className='mt-4' label={common.labels.sign_up} onPress={() => handleSignUp()}></Button>
          <View className='flex-row items-center flex-wrap justify-center mt-4'>
            <Text>{common.data_agreement.first}</Text>
            <TouchableOpacity><Text className='text-primary-800'>{common.data_agreement.links.data_policy}</Text></TouchableOpacity>
            <Text>{common.data_agreement.second}</Text>
            <TouchableOpacity><Text className='text-primary-800'>{common.data_agreement.links.cookies_policy}</Text></TouchableOpacity>

          </View>
          <View className='flex-row items-center flex-wrap justify-center mt-4'>
            <Text variant='body1'>{common.labels.already_have_account}</Text>
            <TouchableOpacity onPress={() => navigate("Login")}><Text className='text-primary-800'>{common.labels.log_in}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>

  )
}
