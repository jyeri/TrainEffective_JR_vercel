import React, { useState, useEffect } from 'react';
import SingleUser from './SingleUser';
import './UserList.css';
import '../App.css';
import useDebounce from './UseDebounce';

// UserList component that displays a list of users based on the search query
function UserList({ searchQuery, isInputFocused }) {
  // State to store the users, error message, typeahead visibility, and suggestion.
  // The useState hook is used to create this state variable and the function to update it.
  const [state, setState] = useState({
    users: [],
    error: null,
    showTypeahead: false,
    suggestion: '',
  });

  // Debounce the search query to limit the number of API calls.
  const debouncedSearchQuery = useDebounce(searchQuery, 100);

  // Use the useEffect hook to fetch data whenever the debounced search query changes.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only fetch data if the debounced search query is not empty.
        if (debouncedSearchQuery.trim() !== '') {
          let users;
          // Try to get the users from localStorage.
          const cachedData = localStorage.getItem(debouncedSearchQuery);
          if (cachedData) {
            users = JSON.parse(cachedData);
          } else {
            // If the users are not in localStorage, fetch them from the API.
            const response = await fetch(`https://api.github.com/search/users?q=${debouncedSearchQuery}`);
            // Handle errors from the API.
            if (!response.ok) {
              let errorMessage;
              switch (response.status) {
                case 403:
                  errorMessage = 'Rate limit exceeded. Please try again later. Usually 1 minute does the trick.';
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
            // Filter the users to only include those that match the search query.
            users = data.items.filter(user => user.login.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));
            // Store the users in localStorage.
            localStorage.setItem(debouncedSearchQuery, JSON.stringify(users));
          }
          // Update the state based on the fetched users.
          if (users.length === 0) {
            setState({
              users: [],
              error: 'I found no matches, you should check your spelling. Or just try typing "Jyeri"',
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
          // If the search query is empty, show a suggestion.
          setState({
            users: [],
            error: null,
            showTypeahead: true,
            suggestion: 'You should try searching for "Jyeri", I heard he is a great developer',
          });
        }
      } catch (error) {
        // If an error occurs, update the state to show the error message.
        setState({
          users: [],
          error: error.message,
          showTypeahead: false,
          suggestion: '',
        });
      }
    };

    // Call the fetchData function.
    fetchData();
  }, [debouncedSearchQuery]);

  // Render the UserList component.
  return (
    <div 
      className="user-list"
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Display the error message if it exists */}
      {state.error && <div className="error-message">{state.error}</div>}
      {/* Display the typeahead if it is visible and the input is focused */}
      {state.showTypeahead && isInputFocused && (
        <ul className="user-results">
          {/* Map over the users and display each one in a SingleUser component */}
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
          {/* Display the suggestion if it exists */}
          {state.suggestion && <li className='suggestion-text'>{state.suggestion}</li>}
        </ul>
      )}
    </div>
  );
}
export default UserList;
