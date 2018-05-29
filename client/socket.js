import io from 'socket.io-client'
const socket = io(window.location.origin)
import store, {getBeat} from './store'

socket.on('connect', () => {
  console.log('Connected!')
  console.log('ooh', window.location.origin)
})

socket.on('beat', count => {
  count = (count + 1) % 16
  store.dispatch(getBeat(count))
})

export default socket
