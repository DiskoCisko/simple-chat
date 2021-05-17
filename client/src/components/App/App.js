import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import socket from '../../socket';
import Chat from '../Chat/Chat';
import Form from '../Form/Form';

import './App.css';

const App = () => {

    const [messeges, setMesseges] = useState([]); // Массив с сообщениями
    const [user, setUser] = useState({}); // Объект с текущем юзером

    // Массив с пользователями, которые в данный момент подключены к комнате
    const [onlineUsers, setOnlineUsesers] = useState([]); 

    // Для управления видимостью спсика пользователей, 
    // которые в данный момент подключены к комнате
    const [showUsers, setShowUsers] = useState(false); 

    const [idRoom, setIdRoom] = useState();  // Номер текущей комнаты
    /**
     * Устанавливает текущего юзера, полученное из компонента Form
     * @param {Object} currentUser  Объект с текущем юзером
     */
    const setUserParam = (currentUser) => {
        setUser(currentUser);
    }
    /**
     * Получает номер текущей комнаты, полученное из компонента Chat
     * @param {Number} id Номер текущей комнаты
     */
    const getIdRooms = (id) => {
        setIdRoom(id);
    }
    /**
     * Формирует объект с сообщением и отправляет его на сервер
     * @param {Sting} currentMessage текст сообщения из компонента Chat
     */
     const handleClickMes = (currentMessage) => {
        socket.emit('chat message', 
            {text: currentMessage, 
            author: user.author, 
            chatRoom:  user.chatRoom});
    }
    /**
     * Изменяет видимость списка пользователей, по событию в компоненте Form
     */
    const letShowUsers = () => {
        setShowUsers(!showUsers);
    }
    /**
     * Поллучает массив с пользователями с сервера 
     * @param {Array} msg   массив с пользователями
     */
    socket.on('users online', function(msg) {
        setOnlineUsesers(msg)
        })
    /**
     * Поллучает массив с пользователями с сервера после 
     * отключения одного из пользователей
     * @param {Array} msg   массив с пользователями
     */   
    socket.on('users online update', function(msg) {
        setOnlineUsesers(msg)
        })
    /**
     * Проверка пользователей подключенных к комноте
     * Сервер чистит пользователей при отключении
     * Если массив с онлайн пользователями пуст, 
     * то на серевер отправляется текущий пользователь
     */ 
    socket.on('check', function() {
            if (onlineUsers.length === 0) {
                socket.emit('user check', user);
            }
        })

    /**
     * Поллучает массив с сообщениями с сервера 
     * и если id комнаты совпадает, передает их в состояние messeges
     * @param {Array} msg   массив с сообщениями
     */   
    socket.on('chat message', function(msg) {
        if (msg.chatRoom == user.chatRoom) {
            setMesseges([...messeges, msg])
        }
    })
    return  <Router>
    <div className="container flex">  
        <Form 
            letShowUsers={letShowUsers} 
            setUserParam={setUserParam}
            idRoom={idRoom}
        />
        <Switch>
            <Route 
            path="/:id" 
            children={<Chat onAddMes={handleClickMes} 
            user={user}
            showUsers={showUsers}
            onlineUsers={onlineUsers}
            messeges={messeges}
            getIdRooms={getIdRooms}/>} />
        </Switch>
    </div>
</Router>
 }
 export default App;
