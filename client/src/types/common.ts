export type SignUpData = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export type SignInData = {
  email?: string | null;
  password?: string | null;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
