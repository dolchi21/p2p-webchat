import GUN from 'gun/gun'

export function client() {
    const peer = 'https://gun-manhattan.herokuapp.com/gun'
    const opt = { peers: [peer] }
    const gun = GUN(opt)
    const dam = (() => {
        return
        const dam = gun.back('opt.mesh')
        setInterval(() => {
            dam.hi(peer)
        }, 1000 * 60 * 10)
    })();
    return gun
}
