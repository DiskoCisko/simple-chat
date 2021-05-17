import React from 'react';
import UserItem from './UserItem/UserItem';
const Users = (props) => {
// Пробигается по масиву с онлайн пользователями и производит их рендер
const listUsers = props.onlineUsers.map((item, index) => {
        if (item.chatRoom === props.user.chatRoom)
          return <UserItem key={index} author={item.author}/>
    })
    return  <>  {props.showUsers&&<ul className="user-list-wrp">
    <h3>Сейчас Online</h3>
    {listUsers}
</ul>} </>
}
export default Users;