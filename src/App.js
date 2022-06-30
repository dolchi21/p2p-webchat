import { useEffect, useRef, useState } from 'react'
import './App.css'

import Config from './config'
import * as Chat from './chat'

const chat = Chat.room(Config.ROOM_ID)

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
  );
}
function Messages(props) {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  useEffect(() => {
    scrollToBottom()
  }, [props.messages])
  return (
    <div className="u-Messages">
      {props.messages.map(msg => (<pre key={'k-' + msg.index}>{JSON.stringify(msg, null, 2)}</pre>))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
    </div>
  )
}
function MessageInput(props) {
  const [inputText, setInputText] = useState('')
  return <input value={inputText} onChange={ev => {
    setInputText(ev.target.value)
  }} onKeyDown={ev => {
    if (ev.key !== 'Enter') return
    props.onMessage(inputText)
    setInputText('')
  }} />
}

export default App;
