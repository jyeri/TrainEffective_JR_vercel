import React from 'react'
import './SingleUser.css'

export const SingleUser = ({user}) => {
  return (
    <li key={user.id}>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="user-link">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <span className="username">{user.login}</span>
        </a>
    </li>
  )
}

export default SingleUser