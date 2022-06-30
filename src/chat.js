
import sha256 from 'crypto-js/sha256'
import * as GUN from './gun'

export const room = (roomId, username = Math.random()) => {
    const gun = GUN.client()
    const chatRoom = gun.get('p2p-webchat').get(roomId)
    let latestMessage
    chatRoom.on(value => {
        const data = JSON.parse(value)
        latestMessage = data
    })
    return {
        gun,
        chatRoom,
        postMessage(message) {
            const data = {
                username,
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
                hash,
                type: 'MESSAGE'
            })
            chatRoom.put(str)
        }
    }
}
