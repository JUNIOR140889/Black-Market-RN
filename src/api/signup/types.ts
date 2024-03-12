export type User = {
  
  email: string;
  provider: string;
  uid: string;
  id: number;
  name: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  birthday: string;
};

export type UserResponse = {
  user: User;
};
