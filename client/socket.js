import io from 'socket.io-client'
import {startBeat} from './components'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('play', () => {
  console.log('yo what the hell is up')
  startBeat()
})

export default socket
