import React from 'react';
import './SearchInput.css'

// SearchInput is a functional component that takes two props:
// setSearchQuery - a function to update the search query state
// setIsInputFocused - a function to update the input focus state
function SearchInput({ setSearchQuery, setIsInputFocused }) {

  // handleInputChange is a function that updates the search query state
  // whenever the input field value changes
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // The component returns a div containing the search input field
  return (
    <div className="input-container">
      <div className="icon-container">
        <span role="img" aria-label="search">🔍</span>
      </div>
      <div className="input-field-container">
        {/* The input field updates the search query state on change,
            sets the input focus state to true when it's focused,
            and sets the input focus state to false with a delay when it loses focus */}
        <input 
          type="text" 
          placeholder="Who are you looking for today?" 
          onChange={handleInputChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => {
            // Add a delay before setting isInputFocused to false
            setTimeout(() => setIsInputFocused(false), 200);
          }}
        />
      </div>
    </div>
  );
}

export default SearchInput;
