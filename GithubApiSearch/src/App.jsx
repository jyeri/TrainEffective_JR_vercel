// App.jsx
import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Footer from './components/Footer';

function App() {
  // State to stone the search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <h1>Profile finder 3.0</h1>
      <SearchInput setSearchQuery={setSearchQuery} />
      <UserList searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default App;
