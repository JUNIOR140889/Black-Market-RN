export type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  uid: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  approved: boolean;
  approvedAt: string;
};

export type UserResponse = {
  user: User;
};

