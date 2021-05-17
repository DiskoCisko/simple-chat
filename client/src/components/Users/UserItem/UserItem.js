import React from 'react';
import './UserItem.css'
const UserItem = (props) => {
    return <li className="user-item">{props.author}</li>
}

export default UserItem;