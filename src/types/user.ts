export interface User {
  id: number;
  name: string;
  age: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  country: string;
  description: string;
  picture: string; 
}
  
  export type UserAction =
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'DELETE_USER'; payload: number };
  