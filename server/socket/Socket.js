// import {Server} from 'socket.io'
// import {server,app} from '../index.js'


// const io = new Server(server,{
//     cors:{
//         origin:'http://localhost:5173',
//         methods:['GET','POST']
//     }
// });

// export const getRecieverId = (userId)=>{
//     return  userSocketMap[userId];
// }

// const userSocketMap = {};

// io.on("connection", (socket) => {
//     console.log("a user connected",socket.id);

//     const userId  = socket.handshake.query.userId
//     if (userId != "undefined") userSocketMap[userId] = socket.id;

//     io.emit('get_online_users',Object.keys(userSocketMap));

//     io.on("disconnect", () => {
//         console.log("a user disconnected",socket.id);
//         delete userSocketMap[userId];
//         io.emit('get_online_users',Object.keys(userSocketMap));
//     });
//   })

//   export {app,io,server}