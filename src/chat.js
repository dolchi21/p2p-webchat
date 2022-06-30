import sha256 from 'crypto-js/sha256'
import * as GUN from './gun'

export const room = (roomId, username) => {
    const state = { username }
    const gun = GUN.client()
    const chatRoom = gun.get('p2p-webchat').get(roomId)
    let latestMessage
    chatRoom.on(value => {
        try {
            const data = JSON.parse(value)
            if (data.type === 'MESSAGE') latestMessage = data
        } catch (err) {
            debugger
        }
    })
    return {
        gun,
        chatRoom,
        username: val => state.username = val,
        postMessage(message) {
            const data = {
                type: 'MESSAGE',
                username: state.username,
                message
            }
            if (latestMessage) {
                if (latestMessage.hash) data.parentHash = latestMessage.hash
                data.index = latestMessage.index + 1
                if (!latestMessage.index) data.index = 1
            }
            const hash = sha256(JSON.stringify(data)).toString()
            const str = JSON.stringify({
                ...data,
                hash
            })
            chatRoom.put(str)
        }
    }
}
