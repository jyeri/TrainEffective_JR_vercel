import React from 'react';
import './SingleUser.css';

// SingleUser is a functional component that takes two props:
// user - an object representing a user
// searchQuery - a string representing the current search query
const SingleUser = ({user, searchQuery}) => {
  // Extracting the username from the user object
  const username = user.login;

  // Finding the index of the search query in the username
  const queryIndex = username.toLowerCase().indexOf(searchQuery.toLowerCase());

  // Splitting the username into three parts: before the match, the match, and after the match
  const beforeMatch = username.slice(0, queryIndex);
  const match = username.slice(queryIndex, queryIndex + searchQuery.length);
  const afterMatch = username.slice(queryIndex + searchQuery.length);

  // The component returns a link to the user's GitHub profile, with the matching part of the username highlighted
  return (
    <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-link">
      {/* If the search query is not empty, display the user's avatar */}
      {searchQuery.trim() !== '' && <img src={user.avatar_url} alt={user.login} className="avatar" />}
      <span className="username">
        {/* Display the username, with the matching part highlighted */}
        <span>{beforeMatch}</span>
        <span className="highlight">{match}</span>
        <span>{afterMatch}</span>
      </span>
    </a>
  )
}

export default SingleUser;
