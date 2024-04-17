// Importing necessary modules
import React from 'react';
import './SearchInput.css'

// SearchInput component
function SearchInput({ setSearchQuery }) {
  // handleInputChange function
  // It takes an event object and sets searchQuery to the value of the input
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Render the SearchInput component
  return (
    <div className="input-container">
      {/* Input field for searching GitHub users. The onChange event handler calls the handleInputChange function. */}
      <input type="text" placeholder="Who are you looking for today?" onChange={handleInputChange} />
    </div>
  );
}

// Export the SearchInput component as the default export
export default SearchInput;
