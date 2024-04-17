// SearchInput.jsx
import React from 'react';
import './SearchInput.css'

function SearchInput({ setSearchQuery }) {
  // handleInputChange takes an event object and sets searchQuery to value of input
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="input-container">
      <input type="text" placeholder="Search for GitHub users" onChange={handleInputChange} />
    </div>
  );
}

export default SearchInput;
