import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Header from './components/Header';

// The App component serves as the root component of the application.
// It maintains the state for the search query and renders the Header, SearchInput, UserList, and Footer components.
function App() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Header />
      <SearchInput setSearchQuery={setSearchQuery} />
      <UserList searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default App;
