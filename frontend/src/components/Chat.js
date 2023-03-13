import React, {useState, useEffect} from 'react'
import ChatStyle from '../styles/Chat.module.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import { BsSend } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";

export default function Chat({socket, username, room}) {
  const [curMessage, setCurMessage ] = useState("")
  const [messageList, setMessageList] = useState([])

  async function sendMessage() {
    if (curMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: curMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message", messageData)
      setMessageList(list => [...list, messageData])
      setCurMessage("")
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("==data received", data);
      setMessageList(list => [...list, data])
    })
  }, [socket])

  return (
    <div className={ChatStyle.chatWindow}>
      <div className={ChatStyle.chatHeader}> 
        <p> live Chat </p>
      </div>
        
      <div className={ChatStyle.chatBody}> 
        <ScrollToBottom className={ChatStyle.messageContainer}>
          {messageList.map((messageContent, idx) => {
            return (
              <div 
                className={ChatStyle.message} 
                id={username === messageContent.author ? ChatStyle.you : ChatStyle.other} 
                key={idx}
              > 
                <div>
                  <div className={ChatStyle.messageContent}>
                    <p> {messageContent.message} </p>
                  </div>
                    
                  <div className={ChatStyle.messageMeta}> 
                    <p id={ChatStyle.time}>{messageContent.time}</p>
                    <p id={ChatStyle.author}>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
        
      </div>
      <div className={ChatStyle.chatFooter}> 
        {/* <div className={ChatStyle.background}></div> */}
        <textarea 
          className={ChatStyle.footerInput}
          placeholder="enter text"
          value={curMessage}
          name="text" 
          rows="2"
          cols="20" 
          wrap="hard"
          maxlength="120"
          onChange={e => setCurMessage(e.target.value)}
        />
        <AiOutlineSend 
          className={ChatStyle.submitBtn}
          onClick={sendMessage}
          onKeyPress={event => {event.key === "Enter" && sendMessage()}}
          />
      </div>
    </div>
  )
}
