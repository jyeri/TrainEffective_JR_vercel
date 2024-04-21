import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Header from './components/Header';

// The App component serves as the root component of the application.
// It maintains the state for the search query and the input focus state,
// and renders the Header, SearchInput, UserList components.
function App() {
  // State to store the search query. The useState hook is used to create
  // this state variable and the function to update it.
  const [searchQuery, setSearchQuery] = useState('');

  // State to track whether the search input is focused. The useState hook
  // is used to create this state variable and the function to update it.
  const [isInputFocused, setIsInputFocused] = useState(false);

  // The App component's return statement. It renders the Header, SearchInput,
  // and UserList components. The SearchInput and UserList components are
  // passed props, including the state variables and the functions to update them.
  return (
    <div className="App">
      <Header />
      {/* The SearchInput component allows the user to enter a search query. 
          It receives setSearchQuery and setIsInputFocused as props to allow it 
          to interact with the state of the App component. */}
      <SearchInput setSearchQuery={setSearchQuery} setIsInputFocused={setIsInputFocused} />
      {/* The UserList component displays a list of users that match the search query. 
          It receives searchQuery and isInputFocused as props to allow it to use 
          the current state of the App component. */}
      <UserList searchQuery={searchQuery} isInputFocused={isInputFocused} />
    </div>
  );
}

export default App;
