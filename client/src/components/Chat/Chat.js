import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Users from '../Users/User';
import MyMes from './Messeges/MyMes';
import OtherMes from './Messeges/OtherMes';
import './Chat.css'
const Chat = (props) => {

    const [currentMessage, setCurrentMessage] = useState(''); // текст с текущем сообщением
    let  {id}  = useParams(); // id комнаты

    /**
     * Передаёт сообщение в компонент App и отчищает поле 
     * @param {event} e onSubmit
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddMes(currentMessage);
        setCurrentMessage('');
    }

    /**
     * Забирает сообщение из textarea и передаёт его в состояние currentMessage
     * @param {event} e onInput
     */
    const handleMes = (e) => {
        setCurrentMessage(e.target.value)
    }

    /**
     * Пробегается по масиву сообщений и в зависимости кто автор производит рендер
     */
    const showMes = props.messeges.map((item, index) => {
        if (item.author == props.user.author) {
            // Если сообщение от текущего пользователя
            return <MyMes 
                key={index}
                sendler={item.author}
                text={item.text}
            />
        }
        // Если сообщение от остальных пользователей
        return <OtherMes 
            key={index}
                sendler={item.author}
                text={item.text}
        />
    })
    /**
     * При монтировании компонента передаёт id комнаты в компонент App
     */
    useEffect(() => {
        props.getIdRooms(id)
        console.log(id) 
    }, [])
    /**
     * Отбражает чат только если существует пользователь
     */
    if (props.user.author) {
        return <div className="chat"> 
      {/* Список пользователей которые подключены к комнате */}
    <Users 
    user={props.user} 
    onlineUsers={props.onlineUsers}
    showUsers={props.showUsers}
    />
    
    <div className="mes-wrp">{showMes}
    <form onSubmit={handleSubmit} className="wrp">
    <textarea 
        value={currentMessage} 
        placeholder="your news..." 
        onInput={ handleMes }>
    </textarea>
    <button type="submit"
        disabled={!currentMessage} 
        className="btn"
        variant="contained" 
        color="primary">
        Отправить
    </button>
    </form>
    </div>
    </div>
      
    } return <></>
}

export default Chat;