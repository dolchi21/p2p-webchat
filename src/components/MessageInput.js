//@ts-check
import { useState } from 'react'

export default function MessageInput(props) {
    const [inputText, setInputText] = useState('')
    return <input value={inputText} onChange={ev => {
        setInputText(ev.target.value)
    }} onKeyDown={ev => {
        if (ev.key !== 'Enter') return
        props.onMessage(inputText)
        setInputText('')
    }} />
}