module.exports = (io) => {
  let start = true
  let beat = false
  let first = true
  let stop;
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log('>>>>>>', start)
    if (start === true) {
      beat = true
      start = false
    }
    console.log('>>>>', first)
    if (beat === true && first === true) {
      let count = 0;
      console.log('here')
      stop = setInterval(() => {
        count = (count + 1) % 16
        socket.broadcast.emit('beat', count)
      }, 125)
      first = false
    }

    socket.on(`newGrid`, grid => {
      console.count('in newGrid')
      socket.broadcast.emit(`sendGrid`, grid)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      start = true
      // first = true
      // clearInterval(stop)
    })
  })
}
