import React from 'react';
import './SingleUser.css';

// SingleUser component that renders a single user's information
const SingleUser = ({user, searchQuery}) => {
  // Extract the username from the user object
  const username = user.login;

  // Find the index of the search query in the username
  const queryIndex = username.toLowerCase().indexOf(searchQuery.toLowerCase());

  // Split the username into the part before the match, the match, and the part after the match
  const beforeMatch = username.slice(0, queryIndex);
  const match = username.slice(queryIndex, queryIndex + searchQuery.length);
  const afterMatch = username.slice(queryIndex + searchQuery.length);

  return (
    <li>
        {/* Link to the user's GitHub profile */}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-link">
            {/* Display the user's avatar if the search query is not empty */}
            {searchQuery.trim() !== '' && <img src={user.avatar_url} alt={user.login} className="avatar" />}
            <span className="username">
              {/* Display the username with the search query highlighted */}
              <span>{beforeMatch}</span>
              <span className="highlight">{match}</span>
              <span>{afterMatch}</span>
            </span>
        </a>
    </li>
  )
}

export default SingleUser;
