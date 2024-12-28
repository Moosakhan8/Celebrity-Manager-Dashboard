import React, { useState } from 'react';
import { User } from '../types/user';

interface EditUserFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);
    const [isSaveEnabled, setSaveEnabled] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setSaveEnabled(true);
    };
  
    const handleSave = () => onSave(formData);
  
    return (
      <div>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            disabled={!isSaveEnabled}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  export default EditUserForm;
  