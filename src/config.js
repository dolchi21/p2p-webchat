import QueryString from 'query-string'

const params = QueryString.parse(window.location.search)

const opts = {
    ROOM_ID: params.roomId || 'test'
}

export default opts
