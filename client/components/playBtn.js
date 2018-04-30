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
      leadNotes:[
        [86, 88, 91, 93],
        [76, 79, 81, 84],
        [64, 67, 69, 72],
        [55, 57, 60, 62]
      ],
      bassNotes: []
    }
  }

  render(){
    if  (first){
        first = false
        socket.on('beat', count => {
        this.playDrums()
        this.playLead()
        this.playBass()
      })
      socket.on(`sendGrid`, grid => {
        this.incomingGrid = grid
      })
      socket.on('sendInstrument', newInstrument => {
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
        if (this.props.grid[j][k] || (this.incomingGrid && this.incomingGrid[j][k]) || this.props.step[j][k]){
          drums.push(this.state.drumSounds[j][k])
        }
      }
    }
    this.midiSounds.playDrumsNow(drums)
  }

  playLead = () => {
    let leadNotes = [];
    for (var j = 0; j < 4; j++){
      for (var k = 0; k < 4; k++){
        if (this.props.instruments[j][k] || (this.incomingInstruments && this.incomingInstruments[j][k])){
          leadNotes.push(this.state.leadNotes[j][k])
        }
      }
    }
    this.midiSounds.playChordNow(this.props.lead, leadNotes, .125)
  }
  playBass = () => {
    let bassNotes = [];
    for (var j = 0; j < 4; j++){
      for (var k = 0; k < 4; k++){
        if (this.props.bass[j][k] || (this.incomingBass && this.incomingBass[j][k])){
          bassNotes.push((this.state.leadNotes[j][k] - 24))
        }
      }
    }
    this.midiSounds.playChordNow(this.props.bassNum, bassNotes, .125)
  }
}

const mapState = (state) => {
  return {
    grid: state.grid,
    instruments: state.instruments,
    lead: state.lead,
    step: state.step,
    bass: state.bass,
    bassNum: state.bassNum
  }
}

export default connect(mapState)(PlayBtn)
