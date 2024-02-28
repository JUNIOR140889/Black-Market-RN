import { Image, Text, View, ImageBackground, SafeAreaView, Button, TextInput } from '../../../ui/core'
import images from '../../../ui/assets/images';
import type { AuthStackScreenProps } from '../../../navigation/types';
import { TouchableOpacity } from 'react-native'

type ScreenProps = {} & AuthStackScreenProps<'Login'>;

export const LoginScreen = ({ navigation: { navigate } }: ScreenProps) => {
    return (
        <ImageBackground className='flex-1' resizeMode='stretch' source={images.backgroundAuth()}>
            <View className='p-8 pt-16 gap-4'>
                <View className='rounded-lg bg-white px-6 pt-8 pb-4 items-center'>
                    <Image source={images.logoBlackMarket()} className='h-8 w-48'></Image>
                    <View className='w-full mt-8'>
                        <Text variant='body1-small'>Email</Text>
                        <TextInput placeholder='Type your email or telephone'></TextInput>
                        <Text variant='body1-small' className='mt-4'>Password</Text>
                        <TextInput secureTextEntry={true} placeholder='Type your password' ></TextInput>
                    </View>
                    <Button variant='primary' size='large' className='mt-4' label='Log In'></Button>
                    <TouchableOpacity>
                        <Text className='mt-4 text-primary-800'>I forgot my password</Text>
                    </TouchableOpacity>
                </View>
                <View className='rounded-lg bg-white items-center px-6 py-4'>
                    <Text variant='body1'>Don't have an account</Text>
                    <Button variant='primary-inverted' size='large' className='mt-4' label='Sign Up' onPress={() => navigate("SignUp")} ></Button>
                </View>
            </View>
        </ImageBackground>
    )
}