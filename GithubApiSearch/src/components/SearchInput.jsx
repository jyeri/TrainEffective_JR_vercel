import React from 'react';
import './SearchInput.css';

// SearchInput is a functional component that receives setSearchQuery and setIsInputFocused as props.
// setSearchQuery is a function to update the search query state.
// setIsInputFocused is a function to update the input focus state.
function SearchInput({ setSearchQuery, setIsInputFocused }) {
  // handleInputChange is a function that updates the search query state whenever the input value changes.
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="input-container">
      <div className="icon-container">
        <span role="img" aria-label="search">🔍</span>
      </div>
      <div className="input-field-container">
        <input 
          type="text" 
          placeholder="Who are you looking for today?" 
          id='0'
          // When the input value changes, call the handleInputChange function.
          onChange={handleInputChange}
          // When the input is focused, update the input focus state to true.
          onFocus={() => setIsInputFocused(true)}
          // When the input loses focus, update the input focus state to false after a delay.
          // The delay is used to prevent the typeahead from disappearing before a user can click on it.
          onBlur={() => {
            setTimeout(() => setIsInputFocused(false), 400);
          }}
        />
      </div>
    </div>
  );
}

export default SearchInput;