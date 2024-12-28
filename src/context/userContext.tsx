import React, { createContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import { userReducer } from './userReducer';
import { User } from '../types/user';

interface UserContextType {
  users: User[];
  dispatch: React.Dispatch<any>;
  searchText: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserContextType = {
  users: [],
  dispatch: () => null,
  searchText: "",
  loading: true,
  error: null,
};

export const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, {
    users: [],
    searchText: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/celebrities.json');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        // Calculate age and Update name value for each user
        const updatedUsers = data.map((user: User) => ({
          ...user,
          age: new Date().getFullYear() - new Date(user.dob).getFullYear(),
          name: user.first + " " + user.last,
        }));
        dispatch({ type: 'SET_USERS', payload: updatedUsers });
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error instanceof Error) {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        } else {
          dispatch({ type: 'SET_ERROR', payload: 'An unknown error occurred' });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(() => ({
        users: state.users,
        dispatch,
        searchText: state.searchText,
        loading: state.loading,
        error: state.error,
      }), [state.users, dispatch, state.searchText, state.loading, state.error])}
    >
      {children}
    </UserContext.Provider>
  );
};

