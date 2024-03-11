import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then(canOpen => canOpen && Linking.openURL(url));
}

export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateStringToMMDDYYYY = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${month}/${day}/${year}`;
};

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store(s => s[k as keyof typeof s]);
  }

  return store;
};

export const formatName = (_name: string) => {
  // “We use ‘s after a singular noun and ’ after a plural noun. (The bedroom belongs to one girl.) The girls’ bedroom.”
  if (_name.toLowerCase().endsWith('s')) {
    return `${_name}'`;
  } else {
    return `${_name}'s`;
  }
};
