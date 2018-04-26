const play = false;
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    if (!play) {
      socket.emit('play')
    }

    socket.on('newSound', (grid) => {
      socket.broadcast.emit('newSound', grid)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
