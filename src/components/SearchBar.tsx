import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const SearchBar = () => {
  const { searchText, dispatch } = useContext(UserContext); 

  return (
    <div className='my-7'>
      <input
        type="text"
        placeholder="🔍 Search user"
        value={searchText}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value})}
        className="border border-black p-2 rounded-xl w-full"
      />
    </div>
  );
};

export default SearchBar;
