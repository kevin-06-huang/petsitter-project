export interface User {
  name: string;
  email: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
