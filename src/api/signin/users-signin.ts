import type { UserInfo } from '../../core/auth/utils';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';

type Variables = { user: { email: string; password: string } };
// type Response = UserResponse;

const signIn = async <T>(variables: Variables): Promise<T> => {
  try {
    const { data } = await client.post('/users/sign_in', variables);

    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};
export const useSignIn = () => useBaseMutation<Variables, UserInfo>({ mutationKey: ['signIn'], mutationFn: signIn, });


  