// Importing necessary modules and components
import React, { useState } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Header from './components/Header';

// Main App component
function App() {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Render the App component
  return (
    <div className="App">
      <Header />
      {/* Pass setSearchQuery as a prop to SearchInput */}
      <SearchInput setSearchQuery={setSearchQuery} />
      {/* Pass searchQuery as a prop to UserList */}
      <UserList searchQuery={searchQuery} />
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

// Export the App component as the default export
export default App;
