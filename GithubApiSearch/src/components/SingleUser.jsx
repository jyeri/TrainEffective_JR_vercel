import React, { memo } from 'react';
import './SingleUser.css';

// SingleUser is a memoized functional component that receives a user object and a search query as props.
// It highlights the part of the user's login that matches the search query.
const SingleUser = memo(({ user, searchQuery }) => {
  // Create a regular expression from the search query.
  const regex = new RegExp(`(${searchQuery})`, 'gi');

  // Split the user's login into parts based on the regular expression.
  const parts = user.login.split(regex);

  return (
    <div style={{ cursor: 'pointer' }}>
      <div className="user-link">
        {/* If the search query is not empty, display the user's avatar. */}
        {searchQuery.trim() !== '' && <img src={user.avatar_url} alt={user.login} className="avatar" />}
        <span className="username">
          {/* For each part of the user's login, if it matches the search query, highlight it. Otherwise, display it as is. */}
          {parts.map((part, index) => 
            part.toLowerCase() === searchQuery.toLowerCase() 
              ? <span key={index} className="highlight">{part}</span> 
              : part
          )}
        </span>
      </div>
    </div>
  );
});

export default SingleUser;