import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import Accordion from './Accordion';

interface UserCardProps {
  user: any;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { dispatch } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // Local state to handle open/close

  const handleToggle = () => {
    setIsOpen((prev) => !prev); // Toggle open/close state
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_USER', payload: user.id });
  };

  return (
    <Accordion name={user.name} isOpen={isOpen} onClick={handleToggle}>
      <p>Name: {user.name}</p>  
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
      <p>Country: {user.country}</p>
      <p>Description: {user.description}</p>
      <div className="flex space-x-2">
        <button className="text-blue-500">Edit</button>
        <button className="text-red-500" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Accordion>
  );
};

export default UserCard;

