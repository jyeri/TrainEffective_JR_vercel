import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Header from './components/Header';

// App is the root component of the application.
// It maintains the state for the search query and the input focus state.
function App() {
  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to track whether the search input is focused
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Renders the Header, SearchInput, and UserList components.
  // SearchInput and UserList components are passed props, including the state variables and the functions to update them.
  return (
    <div 
      className="App"
      onClick={(e) => e.stopPropagation()} // Prevents click events from bubbling up
    >
      <Header />
      {/* SearchInput allows the user to enter a search query. 
          It updates the state of the App component via setSearchQuery and setIsInputFocused props. */}
      <SearchInput setSearchQuery={setSearchQuery} setIsInputFocused={setIsInputFocused} />
      {/* UserList displays users that match the search query. 
          It uses the current state of the App component via searchQuery and isInputFocused props. */}
      <UserList searchQuery={searchQuery} isInputFocused={isInputFocused} />
    </div>
  );
}

export default App;