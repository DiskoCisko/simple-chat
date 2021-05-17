import React, {useState} from 'react';
import socket from '../../socket';
import {Link} from "react-router-dom";
import './Form.css';
const Form = (props) => { 

    const [showForm, setShowForm] = useState(true); // Управляет отображением Form
    const [userName, setUserName] = useState(''); // Имя пользователя
    const chatRoom = Math.floor(Math.random()*1000); // Номер комнаты

    /**
     * Проверяет как произошло подключение, 
     * если номер комнаты уже задан в адресе, 
     * то пользователь перенаправляется в комноту с этим номером
     * если номер комнаты не задан, 
     * создается новый номер и пользователь перенаправляется в неё
     */
    const checkChatRoom = () => {
        if (!props.idRoom) {
            return chatRoom
        } else return props.idRoom
    }

    /**
     * Создаётся ссылка для перенаправления пользователя в комнату
     */
    const setChatRoom = () => {
        return "/" + String(checkChatRoom())
    }
    
    /**
     * Формируется объект с текущем пользователем 
     * и отправляется на сервер и в компонент App
     * так же изменяется видимость формы и списка пользователей
     */
    const handleSub = () => {
        const USER = {
            author: userName,
            chatRoom: checkChatRoom(),
            userId: Math.floor(Math.random()*1000)
          }
        props.setUserParam(USER);
        props.letShowUsers();
        socket.emit('user connect', USER);
        setShowForm(!showForm);
     }

     /**
      * Забирает имя из imput и передаёт в состаяние с Именем пользователя
      * @param {Event} e onInput
      */
     const handleInputName = (e) => {
        setUserName(e.target.value);
     } 
if(showForm) {
    return <><div className="form">
            <input 
                placeholder="Имя" 
                value={userName} 
                className="input"
                onInput={handleInputName}/>
                {/* ссылка для перехода в комнату */}
            {userName&&<Link className="btn" onClick={handleSub} to={setChatRoom()}>Отправить</Link>} 
        </div>
        </>
        } return <></>
}

export default Form;