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
      instrumentNotes:[
        [86, 88, 91, 93],
        [76, 79, 81, 84],
        [64 - 24, 67 - 24, 69 - 24, 72 - 24],
        [55 - 24, 57 - 24, 60 - 24, 62 - 24]
      ]
    }
  }

  render(){
    console.log('yeah', first)
    if  (first){
        first = false
        socket.on('beat', () => {
        this.playDrums()
        this.playInstruments()
      })
      socket.on(`sendGrid`, grid => {
        this.incomingGrid = grid
      })
      socket.on('sendInstrument', newInstrument => {
        console.log('yaaa')
        this.incomingInstruments = newInstrument
      })
    }

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
    this.midiSounds.playDrumsNow(drums)
  }

  playInstruments = () => {
    let instrumentNotes = [];
    for (var j = 0; j < 4; j++){
      for (var k = 0; k < 4; k++){
        if (this.props.instruments[j][k] || (this.incomingInstruments && this.incomingInstruments[j][k])){
          instrumentNotes.push(this.state.instrumentNotes[j][k])
        }
      }
    }
    this.midiSounds.playChordNow(this.props.lead, instrumentNotes, .125)
  }
}

const mapState = (state) => {
  return {
    grid: state.grid,
    instruments: state.instruments,
    lead: state.lead,
  }
}

export default connect(mapState)(PlayBtn)
