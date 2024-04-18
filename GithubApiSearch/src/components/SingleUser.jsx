// Importing necessary modules
import React from 'react';
import './SingleUser.css';

// SingleUser component
const SingleUser = ({user, searchQuery}) => {
  const username = user.login;
  const queryIndex = username.toLowerCase().indexOf(searchQuery.toLowerCase());
  const beforeMatch = username.slice(0, queryIndex);
  const match = username.slice(queryIndex, queryIndex + searchQuery.length);
  const afterMatch = username.slice(queryIndex + searchQuery.length);

  // Render the SingleUser component
  return (
    <li>
        {/* Link to the user's GitHub profile. The target="_blank" attribute opens the link in a new tab, 
        and the rel="noopener noreferrer" attribute prevents the new page from accessing the window object of the original page. */}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-link">
            {/* User's avatar. The alt attribute provides alternative text for users who can't see the image. */}
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            {/* User's username */}
            <span className="username">
              <span>{beforeMatch}</span>
              <span className="highlight">{match}</span>
              <span>{afterMatch}</span>
            </span>
        </a>
    </li>
  )
}

// Export the SingleUser component as the default export
export default SingleUser;
