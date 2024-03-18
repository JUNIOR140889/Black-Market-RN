import type { UserInfo } from '../../core/auth/utils';

import { client } from '../common';
import { parseAxiosError, useBaseMutation } from '../common/utils';

type Variables = { user: { email: string; name: string; password: string; password_confirmation?: string } };
// type Response = UserResponse;

const signUp = async <T>(variables: Variables): Promise<T> => {
  try {
    const { data } = await client.post('/users', variables);

    return data;
  } catch (error) {
    throw parseAxiosError(error);
  }
};
export const useSignUp = () => useBaseMutation<Variables, UserInfo>({ mutationKey: ['signUp'], mutationFn: signUp, });
