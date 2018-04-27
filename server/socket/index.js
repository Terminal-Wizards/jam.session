module.exports = (io) => {
  let first = true
  let beat = false
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    console.log(`>>>>>>>>>>>>>>>>>`, first)
      if (first === true) beat = true
      if (beat === true) setInterval(() => {
        socket.broadcast.emit('beat')
      }, 1000)

    socket.on(`newGrid`, grid => {
      socket.broadcast.emit(`newGrid`, grid)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
