import React, { memo } from 'react';
import './SingleUser.css';

const SingleUser = memo(({ user, searchQuery }) => {
  const regex = new RegExp(`(${searchQuery})`, 'gi');
  const parts = user.login.split(regex);

  return (
    <div style={{ cursor: 'pointer' }}> {/* Remove onClick from this div */}
      <div className="user-link">
        {searchQuery.trim() !== '' && <img src={user.avatar_url} alt={user.login} className="avatar" />}
        <span className="username">
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