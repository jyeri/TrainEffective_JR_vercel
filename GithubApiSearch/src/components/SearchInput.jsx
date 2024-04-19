import React from 'react';
import './SearchInput.css'

// SearchInput component that renders an input field for the user to enter a search query
function SearchInput({ setSearchQuery, setIsInputFocused }) {
  // Function to handle input change events
  const handleInputChange = (e) => {
    // Update the search query state with the new input value
    setSearchQuery(e.target.value);
  };

  return (
    <div className="input-container">
      <div className="icon-container">
        <span role="img" aria-label="search">🔍</span>
      </div>
      <div className="input-field-container">
        {/* Input field where the user enters the search query */}
        <input 
          type="text" 
          placeholder="Who are you looking for today?" 
          onChange={handleInputChange} // Call handleInputChange when the input value changes
          onFocus={() => setIsInputFocused(true)} // Set isInputFocused to true when the input field is focused
          onBlur={() => setIsInputFocused(false)} // Set isInputFocused to false when the input field loses focus
        />
      </div>
    </div>
  );
}

export default SearchInput;
