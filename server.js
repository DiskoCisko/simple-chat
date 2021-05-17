const express = require('express');
const cors = require('cors');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    }
  });



// Массив с пользователями

let USERS = [];


io.on('connection', (socket)=> {
// Получает объект с пользователем от клиента и добавляет его в массив
     socket.on('user connect', (user)=>{
      USERS.push(user);
      // отправляет массив с пользователями клиенту
        io.emit('users online', USERS);
      })
      socket.on('disconnect', (socket)=>{
      // удаляет элементы массива при дисконекте пользователя и отправляет его клиенту
        console.log(socket);
        USERS = [];
        io.emit('users online', USERS);
        // запускает проверку онлайн пользователей
        io.emit('check', true);
      })
      // Получает объект с пользователем от клиента 
      // и если он не повторяется добавляет его в массив с пользователями
      socket.on('user check', (user)=>{
        if(USERS.length == 0) {
          USERS.push(user);
        } else if(user.userId !== USERS[USERS.length-1].userId) {
          USERS.push(user);
        }
        // отправляет массив с онлайн пользователями клиенту, для обнавления
          io.emit('users online update', USERS);
        })
        // получает объект с сообщением от пользователя и отправляет его всем пользователям
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
})

server.listen(3000, () =>{
    console.log('work')
})

