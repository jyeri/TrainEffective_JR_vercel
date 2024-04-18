import React from 'react';
import './SearchInput.css'

// This component takes a setSearchQuery function as a prop, and renders an input field for searching GitHub users.
// When the user types in the input field, setSearchQuery is called with the current input value.
function SearchInput({ setSearchQuery }) {
  // Update the search query when the input value changes
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="input-container">
      {/* Add search icon for visual indication */}
      <span role="img" aria-label="search">🔍</span>
      {/* The onChange event handler calls the handleInputChange function, which updates the search query. */}
      <input type="text" placeholder="Who are you looking for today?" onChange={handleInputChange} />
    </div>
  );
}

export default SearchInput;
