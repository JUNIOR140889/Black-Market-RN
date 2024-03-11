import { create } from 'zustand';

import { queryClient } from '../../api/common/api-provider';

import { createSelectors } from '../utils';
import type { AuthToken, UserInfo } from './utils';
import { storage } from './utils';

interface AuthState {
  token: AuthToken | null;
  session: UserInfo | null;
  status: 'idle' | 'signOut' | 'signIn';
  setAuthToken: (token: AuthToken) => void;
  signIn: (user: UserInfo) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _getAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  session: null,

  setAuthToken: token => {
    storage.setAuthToken(token);

    set({ token });
  },
  signIn: session => {
    storage.setSession(session);

    set({ session, status: 'signIn' });
  },
  signOut: () => {
    storage.removeAuthToken();
    storage.removeSession();

    set({ status: 'signOut', token: null, session: null });
  },

  hydrate: () => {
    try {
      const token = storage.getAuthToken();
      const user = storage.getSession();

      if (token !== null) {
        get().setAuthToken(token);
        get().signIn(user);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const getAuth = createSelectors(_getAuth);

export const signOut = () => {
  queryClient.removeQueries();

  _getAuth.getState().signOut();
};
export const signIn = (data: UserInfo) => _getAuth.getState().signIn(data);

export const setAuthToken = (data: AuthToken) => _getAuth.getState().setAuthToken(data);
export const hydrateAuth = () => _getAuth.getState().hydrate();
