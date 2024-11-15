// import React, { useEffect, useState } from "react";

// // Replace with your backend URL

// const TestChat = ({ roomId, userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // When the component mounts, join the chat room
//   // useEffect(() => {
//   //   socket.emit("joinRoom", roomId);

//   //   // Listen for incoming messages
//   //   socket.on("receiveMessage", (data) => {
//   //     setMessages((prevMessages) => [...prevMessages, data]);
//   //   });

//   //   return () => {
//   //     socket.off("receiveMessage"); // Clean up the listener when the component unmounts
//   //   };
//   // }, [roomId]);

//   // // Send message to server
//   // const sendMessage = () => {
//   //   socket.emit("sendMessage", { roomId, senderId: userId, message });
//   //   setMessages((prevMessages) => [...prevMessages, { senderId: userId, message }]);
//   //   setMessage(""); // Clear message input
//   // };

//   return (
//     <div>
//       <h2>Test Chat - Room: {roomId}</h2>
//       <div className="chat-box" style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.senderId}</strong>: {msg.message}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message"
//         style={{ marginTop: "10px", padding: "5px", width: "80%" }}
//       />
//       <button onClick={sendMessage} style={{ padding: "5px 10px", marginLeft: "10px" }}>Send</button>
//     </div>
//   );
// };

// export default TestChat;


// import React, { useState } from 'react';
// import './Test.css'
// import { Search, Video, Phone, Settings, Paperclip, Smile, Send } from 'lucide-react';

// const ChatInterface = () => {
//   const [activeTab, setActiveTab] = useState('ACTIVE NOW');
//   const [message, setMessage] = useState('');

//   const users = [
//     { id: 1, name: 'John Doe', status: 'Active Now', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Hey!' },
//     { id: 2, name: 'Ollia Jones', status: 'Offline', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Great call!' },
//     { id: 3, name: 'Nishta Jain', status: 'Online', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'See you soon!' },
//     { id: 4, name: 'Dhijiu Mathew', status: 'Away', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Call ended • 27m 37s' },
//     { id: 5, name: 'Malini Sharma', status: 'Online', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'So can I make a call?' },
//     { id: 6, name: 'Abhishek Goyal', status: 'Offline', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'I have send all the details as p...' },
//   ];

//   const messages = [
//     { id: 1, sender: 'John Doe', text: 'Hey!', time: '11:15 pm' },
//     { id: 2, sender: 'John Doe', text: 'Hi, how are you doing? I was wondering if you can share the documents with me by today itself.', time: '11:15 pm' },
//     { id: 3, sender: 'You', text: 'I am doing great. How are you doing?', time: '11:16 pm' },
//     { id: 4, sender: 'You', text: 'Please give me sometime.', time: '11:16 pm' },
//     { id: 5, sender: 'You', text: 'As I am already working on that document.', time: '11:16 pm' },
//   ];

//   return (
//     <div className="chat-container">
//       <div className="sidebar">
//         <div className="sidebar-header">
//           <div className="user-profile">
//             <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="avatar" />
//             <span>Shikha Gupta</span>
//           </div>
//           <Settings className="icon" />
//         </div>
        
//         <div className="search-bar">
//           <Search className="search-icon" />
//           <input type="text" placeholder="Search" />
//         </div>

//         <div className="tabs">
//           <button 
//             className={activeTab === 'ACTIVE NOW' ? 'active' : ''} 
//             onClick={() => setActiveTab('ACTIVE NOW')}
//           >
//             ACTIVE NOW
//           </button>
//           <button 
//             className={activeTab === 'FAVOURITE' ? 'active' : ''} 
//             onClick={() => setActiveTab('FAVOURITE')}
//           >
//             FAVOURITE
//           </button>
//           <button 
//             className={activeTab === 'ALL' ? 'active' : ''} 
//             onClick={() => setActiveTab('ALL')}
//           >
//             ALL
//           </button>
//         </div>

//         <div className="users-list">
//           {users.map(user => (
//             <div key={user.id} className="user-item">
//               <img src={user.avatar} alt={user.name} className="avatar" />
//               <div className="user-info">
//                 <div className="user-name">{user.name}</div>
//                 <div className="last-message">{user.lastMessage}</div>
//               </div>
//               <div className="user-status">{user.status}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="chat-area">
//         <div className="chat-header">
//           <div className="chat-user">
//             <img src="/placeholder.svg?height=40&width=40" alt="John Doe" className="avatar" />
//             <span>John Doe</span>
//             <div className="status-dot"></div>
//           </div>
//           <div className="chat-actions">
//             <button className="icon-button"><Video className="icon" /></button>
//             <button className="icon-button"><Phone className="icon" /></button>
//             <button className="icon-button"><Settings className="icon" /></button>
//           </div>
//         </div>

//         <div className="messages">
//           {messages.map(message => (
//             <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
//               <div className="message-content">
//                 <p>{message.text}</p>
//                 <span className="time">{message.time}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="message-input">
//           <button className="icon-button">
//             <Smile className="icon" />
//           </button>
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button className="icon-button">
//             <Paperclip className="icon" />
//           </button>
//           <button className="send-button">
//             <Send className="icon" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;