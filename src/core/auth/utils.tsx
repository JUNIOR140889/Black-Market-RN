import { getItem, removeItem, setItem } from '../../core/storage';

const TOKEN = 'token';

export type AuthToken = {
  access: string;
  client: string;
  uid: string;
  expiry: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
  hasKids: boolean;
};

export type Gender = 'male' | 'female';

export type Kid = {
  id: number;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthdate: string;
  dueDate: string;
  premature: string;
  weight?: number;
  height?: number;
  avatar?: string;
  image?: string;
  bedTimeStorySchedule?: string;
  bedTimeStoryScheduleConfigured?: boolean;
};

export type Location = {
  id: number;
  state: string;
  city: string;
  zipCode: string;
};

export type UserInfo = {
  user: User;
  kids: Kid[];
  location: Location;
};

export const storage = {
  getAuthToken: () => getItem<AuthToken>(TOKEN),
  removeAuthToken: () => removeItem(TOKEN),
  setAuthToken: (value: AuthToken) => setItem<AuthToken>(TOKEN, value),

  setSession: (value: UserInfo) => setItem<UserInfo>('session', value),
  getSession: () => getItem<UserInfo>('session'),
  removeSession: () => removeItem('session'),
};
