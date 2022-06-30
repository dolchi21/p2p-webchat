import GUN from 'gun/gun'

export function client() {
    const opt = { peers: ['https://gun-manhattan.herokuapp.com/gun'] }
    const gun = GUN(opt)
    return gun
}
