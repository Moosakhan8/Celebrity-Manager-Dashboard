import React, { useState } from 'react';
import { User } from '../types/user';
import Accordion from './Accordion';
import EditUserForm from './EditUserForm';
import DeleteDialog from './DeleteDialog';

interface UserListProps {
  users: User[];
  searchText: string;
  onEdit: (updatedUser: User) => void;
  onDelete: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, searchText, onEdit, onDelete }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    if (editId !== null) return; // Prevent toggling during edit
    setOpenId(openId === id ? null : id);
  };

  const confirmDelete = () => {
    if (deleteUserId !== null) {
      onDelete(deleteUserId);
      setDeleteUserId(null); // Close the dialog
    }
  };

  const filteredUsers = (users || []).filter((user) =>
    user.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!filteredUsers.length) return <p>No Users Found</p>

  return (
    <div>
      {filteredUsers.map((user) => (
        <Accordion
          key={user.id}
          name={user.name}
          isOpen={openId === user.id}
          onClick={() => handleToggle(user.id)}
          picture={user.picture} 
        >
          {editId === user.id ? (
            <EditUserForm
              user={user}
              onSave={(updatedUser) => {
                onEdit(updatedUser);
                setEditId(null);
              }}
              onCancel={() => setEditId(null)}
            />
          ) : (
            <div>
              <p>Name: {user.name}</p>  
              <p>Age: {user.age}</p>
              <p>Gender: {user.gender}</p>
              <p>Country: {user.country}</p>
              <p>Description: {user.description}</p>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setEditId(user.id)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => setDeleteUserId(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Accordion>
      ))}


      {deleteUserId !== null && (
        <DeleteDialog
          isOpen={true}
          onClose={() => setDeleteUserId(null)}
          onConfirm={confirmDelete}
          userName={
            users.find((user) => user.id === deleteUserId)?.name ?? 'this user'
          }
        />
      )}
    </div>
  );
};

export default UserList;
