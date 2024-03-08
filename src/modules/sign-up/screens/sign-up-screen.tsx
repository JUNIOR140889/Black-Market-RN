import { Text, Image, View, ImageBackground, SafeAreaView, Button, TextInput } from '../../../ui/core'
import images from '../../../ui/assets/images';
import { TouchableOpacity } from 'react-native'
import type { AuthStackScreenProps } from '../../../navigation/types';

type ScreenProps = AuthStackScreenProps<'SignUp'>;

export const SignUpScreen = ({ navigation: { navigate } }: ScreenProps) => {
  return (
    <ImageBackground className='flex-1' resizeMode='stretch' source={images.backgroundAuth()}>
      <View className='p-8 pt-16 gap-4'>
        <View className='rounded-lg bg-white px-6 pt-8 pb-4 items-center'>
          <Image source={images.logoBlackMarket()} className='h-8 w-48'></Image>
          <View className='w-full mt-8'>
            <Text variant='body1-small'>Email</Text>
            <TextInput placeholder='Type your email'></TextInput>
            <Text variant='body1-small' className='mt-4'>Full Name</Text>
            <TextInput placeholder='Type your email or telephone'></TextInput>
            <Text variant='body1-small' className='mt-4'>Password</Text>
            <TextInput secureTextEntry={true} placeholder='Type your password' ></TextInput>
          </View>
          <Button variant='primary' size='large' className='mt-4' label='Sign In'></Button>
          <View className='flex-row items-center flex-wrap justify-center mt-4'>
            <Text>By signing up, you accept the</Text>
            <TouchableOpacity><Text className='text-primary-800'>Data Policy</Text></TouchableOpacity>
            <Text> and the </Text>
            <TouchableOpacity><Text className='text-primary-800'>Cookies Policy.</Text></TouchableOpacity>

          </View>
          <View className='flex-row items-center flex-wrap justify-center mt-4'>
            <Text variant='body1'>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigate("Login")}><Text className='text-primary-800'>Log in</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>

  )
}