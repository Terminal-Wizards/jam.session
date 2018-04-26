import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';
import {connect} from 'react-redux'
import socket from '../socket';

class Tick extends Component{
  constructor(props){
    super(props)
    this.state = {
      drumTick: 225,
      drumSounds: [[70, 80, 100, 175], [75, 65, 62, 52], [5, 10, 20, 45], [1, 15, 35, 55]],
      instruments: [
        [[929, [88], 1/16], [929, [91], 1/16], [929, [96], 1/16], [929, [98], 1/16]],
        [[929, [79], 1/16], [929, [81], 1/16], [929, [84], 1/16], [929, [86], 1/16]],
        [[929, [69], 1/16], [929, [72], 1/16], [929, [74], 1/16], [929, [76], 1/16]],
        [[929, [60], 1/16], [929, [62], 1/16], [929, [64], 1/16], [929, [67], 1/16]]
      ],
      tick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    }
    this.play = false
    this.state.data=[]
    this.beats = []
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  componentDidUpdate(){
    socket.emit('newSound', this.props.grid, this.props.instruments)
    this.fillBeat()
  }

  fillBeat(){
    for (var i = 0; i < 16; i++){
      var drums = [];
      var instrus = []
      if (this.state.tick[i]) {drums.push(this.state.drumTick)}
      for (var j = 0; j < 4; j++){
        for (var k = 0; k < 4; k++){
          if (this.props.grid[j][k] || (this.incomingGrid && this.incomingGrid[j][k])){
            drums.push(this.state.drumSounds[j][k])
          }
          if (this.props.instruments[j][k] || (this.incomingInstruments && this.incomingInstruments[j][k])){
            instrus.push(this.state.instruments[j][k])
          }
        }
      }
      var beat = [drums, instrus]
      this.beats[i] = beat
    }
  }
  playLoop = () => {
		this.fillBeat()
		this.midiSounds.startPlayLoop(this.beats, 120, 1 / 16)
	}
	stopLoop = () => {
		this.midiSounds.stopPlayLoop()
  }

  render(){
    socket.on('newSound', (grid, instruments) => {
      this.incomingGrid = grid
      this.incomingInstruments = instruments
      this.fillBeat()
    })
    return(
      <div>
        <button onClick={this.playLoop}>Play loop</button>
        <button onClick={this.stopLoop}>Stop loop</button>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="app"
      />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    grid: state.grid,
    instruments: state.instruments,
  }
}

export default connect(mapState)(Tick)
