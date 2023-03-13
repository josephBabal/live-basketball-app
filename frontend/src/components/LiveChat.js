import React from 'react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from '../styles/LiveChat.module.css'

let socket

export default function LiveChat() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      setAllMessages((pre) => [...pre, data]);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("emitted");

    socket.emit("send-message", {
      username,
      message
    });

    setMessage("");
  }

  console.log("==all messages", allMessages)


  return (
    <div className={styles.container}>
      <div>
        <h1>Chat app</h1>
        <h1>Enter a username</h1>

        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter username"
        />

        <br />
        <br />

        <div className={styles.chatContainer}>
          {allMessages.map(({ username, message }, index) => (
            <div key={index}>
              {username}: {message}
            </div>
          ))}

          <br />

          <form onSubmit={handleSubmit}>
            <input
              name="message"
              placeholder="enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete={"off"}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
