import React, { useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import './UserList.css';
import '../App.css';
import useDebounce from './UseDebounce';

// UserList component that displays a list of users based on the search query
function UserList({ searchQuery, isInputFocused }) {
  // State variables for users, error message, typeahead visibility, and suggestion
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showTypeahead, setShowTypeahead] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  // Debounce the search query to limit the number of API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  // Use useEffect to fetch data whenever the debounced search query changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // If the search query is not empty, fetch data from the GitHub API
        if (debouncedSearchQuery.trim() !== '') {
          const response = await fetch(`https://api.github.com/search/users?q=${debouncedSearchQuery}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: Try again in one minute.`);
          }
          const data = await response.json();
          // Filter the results to include only users whose login includes the search query
          const matches = data.items.filter(user => user.login.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
          // If there are no matches, set the error message and hide the typeahead
          if (matches.length === 0) {
            setError('I found no matches, you should check your spelling. Or just try typing "Jyeri"');
            setUsers([]);
            setShowTypeahead(false);
          } else {
            // If there are matches, set the users, clear the error message, and show the typeahead
            setUsers(matches);
            setError(null);
            setShowTypeahead(true);
          }
        } else {
          // If the search query is empty, clear the users and show the suggestion
          setUsers([]);
          setSuggestion('You should try searching for "Jyeri", I heard he is a great developer');
          setError(null);
          setShowTypeahead(true);
        }
      } catch (error) {
        // If an error occurs, set the error message and hide the typeahead
        setError(error.message);
        setUsers([]);
        setShowTypeahead(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [debouncedSearchQuery]);

  // Render the UserList component
  return (
    <div className="user-list">
      {/* Display the error message if it exists */}
      {error && <div className="error-message">{error}</div>}
      {/* Display the typeahead if it is visible and the input is focused */}
      {showTypeahead && isInputFocused && (
        <ul className="user-results">
          {/* Map over the users and display each one in a SingleUser component */}
          {users.map((user, index) => (
            <li key={index}>
              <SingleUser user={user} searchQuery={searchQuery} />
            </li>
          ))}
          {/* Display the suggestion if it exists */}
          {suggestion && <li className='suggestion-text'>{suggestion}</li>}
        </ul>
      )}
    </div>
  );
}

export default UserList;
