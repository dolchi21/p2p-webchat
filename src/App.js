//@ts-check
import React, { useEffect, useRef, useState } from 'react'
import './App.css'

import Config from './config'
import * as Chat from './chat'

import Message from './components/Message'
import MessageInput from './components/MessageInput'

const chat = Chat.room(Config.ROOM_ID, Config.username)

function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    chat.chatRoom.on(value => {
      try {
        const data = JSON.parse(value)
        setMessages(messages => messages.concat(data))
      } catch (err) { }
    })
  }, [])
  return (
    <div>
      <header className="App-header">
        <Messages messages={messages} />
        <MessageInput onMessage={message => {
          chat.postMessage(message)
        }} />
      </header>
    </div>
  )
}
function Messages(props) {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  useEffect(() => {
    scrollToBottom()
  }, [props.messages])
  return (
    <div className="u-Messages">
      {props.messages.map(Message)}
      <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
    </div>
  )
}

export default App
