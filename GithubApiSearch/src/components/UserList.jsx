//UserList.jsx
import React, { useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import './UserList.css';
import '../App.css';

function UserList({ searchQuery }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showTypeahead, setShowTypeahead] = useState(false); // Add state for controlling visibility of typeahead

  useEffect(() => {
    const fetchData = async () => {
      // https://www.altcademy.com/blog/how-to-throw-an-error-in-javascript/
      // error handling in fetch since github has strict request limits
      // also new state to control visibility of typeahead
      try {
        if (searchQuery.trim() !== '') {
          const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: Try again in one minute.`);
          }
          const data = await response.json();
          setUsers(data.items.slice(0, 20));
          setError(null);
          setShowTypeahead(true); // Show typeahead when there are results
        } else {
          setUsers([]);
          setError(null);
          setShowTypeahead(false); // Hide typeahead when no input
        }
      } catch (error) {
        setError(error.message);
        setUsers([]);
        setShowTypeahead(false); // Hide typeahead when error is caught
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="user-list">
      {error && <div className="error-message">{error}</div>}
      {showTypeahead && ( // Conditionally render typeahead based on showTypeahead state
        <ul className="user-results">
          {users.map(user => (
            <SingleUser key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
