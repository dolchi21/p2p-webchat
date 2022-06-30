//@ts-check
import Config from '../config'

export default function Message(msg) {
    return (
        <div className={msg.username === Config.username ? 'u-self' : ''}>
            <div style={{ fontSize: 'small' }}>{msg.username}</div>
            <div key={'k-' + msg.hash}>{msg.message}</div>
        </div>
    )
}
