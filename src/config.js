import QueryString from 'query-string'
import sha256 from 'crypto-js/sha256'

function generateRandomUsername() {
    return sha256(Math.random()).toString()
}

const params = QueryString.parse(window.location.search)

const opts = {
    username: params.username || generateRandomUsername(),
    ROOM_ID: params.roomId || 'test'
}

export default opts
