//UserList.jsx
import React, { useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import './UserList.css';
import '../App.css';

function UserList({ searchQuery }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showTypeahead, setShowTypeahead] = useState(false); // Add state for controlling visibility of typeahead

  // useEffect hook to fetch data when searchQuery changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch data if searchQuery is not empty
        if (searchQuery.trim() !== '') {
          const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
          // Throw an error if the response is not ok
          if (!response.ok) {
            throw new Error(`Failed to fetch data: Try again in one minute.`);
          }
          const data = await response.json();
          // Filter the users to only include those whose username contains the search query
          const matches = data.items.filter(user => user.login.toLowerCase().includes(searchQuery.toLowerCase()));
          // Update the users state with the matches
          setUsers(matches);
          // Clear the error state
          setError(null);
          // Show the typeahead
          setShowTypeahead(true);
        } else {
          // Clear the users and error state and hide the typeahead if searchQuery is empty
          setUsers([]);
          setError(null);
          setShowTypeahead(false);
        }
      } catch (error) {
        // Update the error state with the error message, clear the users state, and hide the typeahead if an error is caught
        setError(error.message);
        setUsers([]);
        setShowTypeahead(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [searchQuery]); // Dependency array for useEffect hook

  // Render the UserList component
  return (
    <div className="user-list">
      {/* Render the error message if there is an error */}
      {error && <div className="error-message">{error}</div>}
      {/* Render the typeahead if showTypeahead is true */}
      {showTypeahead && (
        <ul className="user-results">
          {/* Map over the users state and render a SingleUser component for each user */}
          {users.map(user => (
            <SingleUser key={user.id} user={user} searchQuery={searchQuery} />
          ))}
        </ul>
      )}
    </div>
  );
}

// Export the UserList component as the default export
export default UserList;
