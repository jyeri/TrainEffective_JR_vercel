import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Header from './components/Header';

// The App component serves as the root component of the application.
// It maintains the state for the search query and the input focus state,
// and renders the Header, SearchInput, UserList, and Footer components.
function App() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');
  // State to track whether the search input is focused
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="App">
      <Header />
      {/* The SearchInput component allows the user to enter a search query. */}
      <SearchInput setSearchQuery={setSearchQuery} setIsInputFocused={setIsInputFocused} />
      {/* The UserList component displays a list of users that match the search query. */}
      <UserList searchQuery={searchQuery} isInputFocused={isInputFocused} />
      <Footer />
    </div>
  );
}

export default App;
