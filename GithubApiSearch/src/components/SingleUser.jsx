// Importing necessary modules
import React from 'react';
import './SingleUser.css';

// SingleUser component
const SingleUser = ({user}) => {
  // Render the SingleUser component
  return (
    <li>
        {/* Link to the user's GitHub profile. The target="_blank" attribute opens the link in a new tab, 
        and the rel="noopener noreferrer" attribute prevents the new page from accessing the window object of the original page. */}
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-link">
            {/* User's avatar. The alt attribute provides alternative text for users who can't see the image. */}
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            {/* User's username */}
            <span className="username">{user.login}</span>
        </a>
    </li>
  )
}

// Export the SingleUser component as the default export
export default SingleUser;