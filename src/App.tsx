import { useContext } from 'react';
import { UserContext } from './context/userContext';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import Title from './components/Title';

const App = () => {
  const { users, searchText, loading, error, dispatch } = useContext(UserContext);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleEdit = (updatedUser: any) => {
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
  };

  const handleDelete = (userId: number) => {
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  return (
    <div className="container w-full max-w-[750px] mx-auto p-5">
      <Title>Celebrity Manager Dashboard</Title>
      <SearchBar />
      <UserList users={users} searchText={searchText} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;

