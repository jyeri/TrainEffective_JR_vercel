import React, { useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import './UserList.css';
import '../App.css';
import useDebounce from './UseDebounce';

// UserList component displays a list of users based on the search query.
// It receives searchQuery and isInputFocused as props.
function UserList({ searchQuery, isInputFocused }) {
  // State for storing users, error message, typeahead visibility, and suggestion.
  const [state, setState] = useState({
    users: [],
    error: null,
    showTypeahead: false,
    suggestion: '',
  });

  // Debounce the search query to limit the number of API calls.
  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  // Fetch data whenever the debounced search query changes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debouncedSearchQuery.trim() !== '') {
          let users;
          const cachedData = localStorage.getItem(debouncedSearchQuery);
          if (cachedData) {
            users = JSON.parse(cachedData);
          } else {
            const response = await fetch(`https://api.github.com/search/users?q=${debouncedSearchQuery}`);
            if (!response.ok) {
              let errorMessage;
              switch (response.status) {
                case 403:
                  errorMessage = 'Rate limit exceeded. Please try again later.';
                  break;
                case 404:
                  errorMessage = 'Users not found.';
                  break;
                default:
                  errorMessage = 'An error occurred. Please try again.';
              }
              throw new Error(errorMessage);
            }
            const data = await response.json();
            users = data.items.filter(user => user.login.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
            localStorage.setItem(debouncedSearchQuery, JSON.stringify(users));
          }
          if (users.length === 0) {
            setState({
              users: [],
              error: 'No matches found. Check your spelling or maybe try "Jyeri".',
              showTypeahead: false,
              suggestion: '',
            });
          } else {
            setState({
              users: users,
              error: null,
              showTypeahead: true,
              suggestion: '',
            });
          }
        } else {
          setState({
            users: [],
            error: null,
            showTypeahead: true,
            suggestion: 'Try searching for "Jyeri", I heard he is great dev.',
          });
        }
      } catch (error) {
        setState({
          users: [],
          error: error.message,
          showTypeahead: false,
          suggestion: '',
        });
      }
    };
    fetchData();
  }, [debouncedSearchQuery]);

  return (
    <div 
      className="user-list"
      onMouseDown={(e) => e.preventDefault()}
    >
      {state.error && <div className="error-message">{state.error}</div>}
      {state.showTypeahead && isInputFocused && (
        <ul className="user-results">
          {state.users.map((user) => (
            <li 
              key={user.id} 
              onClick={(e) => {
                e.stopPropagation();
                window.open(user.html_url, '_blank');
              }}
            >
              <SingleUser user={user} searchQuery={searchQuery} />
            </li>
          ))}
          {state.suggestion && <li className='suggestion-text'>{state.suggestion}</li>}
        </ul>
      )}
    </div>
  );
}

export default UserList;