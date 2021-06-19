import React from 'react';

const SearchBus = ({name, setName}) => {
  return (
    <input 
     key="name"
     value={name}
     onChange={(e) => setName(e.target.value)}
    />
  );
}

export default SearchBus