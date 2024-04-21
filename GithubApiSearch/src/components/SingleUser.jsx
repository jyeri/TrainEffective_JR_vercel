import React, { memo } from 'react';
import './SingleUser.css';

// SingleUser is a memoized functional component that displays a single user.
// It receives the user and the search query as props.
const SingleUser = memo(({ user, searchQuery }) => {
  // Create a regular expression from the search query.
  const regex = new RegExp(`(${searchQuery})`, 'gi');

  // Split the username into parts based on the regular expression.
  const parts = user.login.split(regex);

  // handleClick is a function that opens the user's GitHub profile in a new tab when the user is clicked.
  const handleClick = (e) => {
    e.stopPropagation();
    window.open(user.html_url, '_blank');
  };

  // Render the SingleUser component.
  return (
    <div 
      className="user-link"
      onClick={handleClick}
    >
      {/* If the search query is not empty, display the user's avatar. */}
      {searchQuery.trim() !== '' && <img src={user.avatar_url} alt={user.login} className="avatar" />}
      <span className="username">
        {/* Map over the parts of the username and highlight the parts that match the search query. */}
        {parts.map((part, index) => 
          part.toLowerCase() === searchQuery.toLowerCase() 
            ? <span key={index} className="highlight">{part}</span> 
            : part
        )}
      </span>
    </div>
  );
});

export default SingleUser;
