import React, {Component} from 'react'
import MIDISounds from 'midi-sounds-react';
import {connect} from 'react-redux'

import socket from '../socket'

let first = true

class PlayBtn extends Component{
  constructor(props){
    super(props)
    this.state = {
      drumSounds: [[70, 80, 100, 175], [75, 65, 62, 52], [5, 10, 20, 45], [1, 15, 35, 55]],
    }
  }

  render(){
    console.count('playBtn rendered')
    if  (first){
        first = false
        socket.on('beat', () => {
        console.count(`beat socket`)
        this.playDrums()
      })
    }
    socket.on(`sendGrid`, grid => {
      this.incomingGrid = grid
    })

    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="app"
        drums={[70, 80, 100, 175, 75, 65, 62, 52, 5, 10, 20, 45, 1, 15, 35, 55]} />
      </div>
    )
  }

  playDrums = () => {
    let drums = [];
    for (var j = 0; j < 4; j++){
      for (var k = 0; k < 4; k++){
        if (this.props.grid[j][k] || (this.incomingGrid && this.incomingGrid[j][k])){
          drums.push(this.state.drumSounds[j][k])
        }
      }
    }
    console.log(drums)
    this.midiSounds.playDrumsNow(drums)
  }
}

const mapState = (state) => {
  return {
    grid: state.grid,
  }
}

export default connect(mapState)(PlayBtn)
