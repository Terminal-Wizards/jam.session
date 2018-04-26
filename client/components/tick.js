import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';
import {connect} from 'react-redux'
import socket from '../socket';

class Tick extends Component{
  constructor(props){
    super(props)
    this.state = {
      drumTick: 225,
      drumSound1: 70,
      drumSound2: 80,
      drumSound3: 100,
      drumSound4: 175,
      drumSound5: 75,
      drumSound6: 65,
      drumSound7: 62,
      drumSound8: 52,
      drumSound9: 5,
      drumSound10: 10,
      drumSound11: 20,
      drumSound12: 45,
      drumSound13: 1,
      drumSound14: 15,
      drumSound15: 35,
      drumSound16: 55,
      tick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
    }
    this.play = false
    this.state.data=[]
    this.beats = []
  }

  componentDidMount() {
    this.setState({ initialized: true });
    this.playLoop()
  }

  componentDidUpdate(){
    socket.emit('newSound', this.props.grid)
    this.fillBeat()
  }

  mouseDown = async (target) => {
    await this.setState({[target]: true})
    this.fillBeat()
  }

  mouseUp = async (target) => {
    await this.setState({[target]: false})
    this.fillBeat()
  }

  fillBeat(){
    for (var i = 0; i < 16; i++){
      var drums = [];
      var instrus = []
      if (this.state.tick[i]) {drums.push(this.state.drumTick)}
      if (this.props.grid[0][0] || (this.incoming && this.incoming[0][0])) {drums.push(this.state.drumSound1)}
      if (this.props.grid[0][1] || (this.incoming && this.incoming[0][1])) {drums.push(this.state.drumSound2)}
      if (this.props.grid[0][2] || (this.incoming && this.incoming[0][2])) {drums.push(this.state.drumSound3)}
      if (this.props.grid[0][3] || (this.incoming && this.incoming[0][3])) {drums.push(this.state.drumSound4)}
      if (this.props.grid[1][0] || (this.incoming && this.incoming[1][0])) {drums.push(this.state.drumSound5)}
      if (this.props.grid[1][1] || (this.incoming && this.incoming[1][1])) {drums.push(this.state.drumSound6)}
      if (this.props.grid[1][2] || (this.incoming && this.incoming[1][2])) {drums.push(this.state.drumSound7)}
      if (this.props.grid[1][3] || (this.incoming && this.incoming[1][3])) {drums.push(this.state.drumSound8)}
      if (this.props.grid[2][0] || (this.incoming && this.incoming[2][0])) {drums.push(this.state.drumSound9)}
      if (this.props.grid[2][1] || (this.incoming && this.incoming[2][1])) {drums.push(this.state.drumSound10)}
      if (this.props.grid[2][2] || (this.incoming && this.incoming[2][2])) {drums.push(this.state.drumSound11)}
      if (this.props.grid[2][3] || (this.incoming && this.incoming[2][3])) {drums.push(this.state.drumSound12)}
      if (this.props.grid[3][0] || (this.incoming && this.incoming[3][0])) {drums.push(this.state.drumSound13)}
      if (this.props.grid[3][1] || (this.incoming && this.incoming[3][1])) {drums.push(this.state.drumSound14)}
      if (this.props.grid[3][2] || (this.incoming && this.incoming[3][2])) {drums.push(this.state.drumSound15)}
      if (this.props.grid[3][3] || (this.incoming && this.incoming[3][3])) {drums.push(this.state.drumSound16)}
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
    socket.on('newSound', (grid) => {
      this.incoming = grid
      this.fillBeat()
    })
    return(
      <div>
        <button onClick={this.playLoop}>Play loop</button>
        <button onClick={this.stopLoop}>Stop loop</button>
        <button onMouseDown={() => this.mouseDown('pos1')} onMouseUp={() => this.mouseUp('pos1')}>Snare</button>
        <button onMouseDown={() => this.mouseDown('pos2')} onMouseUp={() => this.mouseUp('pos2')}>Sound</button>
        <button onMouseDown={() => this.mouseDown('pos3')} onMouseUp={() => this.mouseUp('pos3')}>Sound</button>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="app"
        drums={[this.state.drumTick, this.state.drumSound1, this.state.drumSound2, this.state.drumSound3, this.state.drumSound4, this.state.drumSound4, this.state.drumSound5, this.state.drumSound6, this.state.drumSound7, this.state.drumSound8, this.state.drumSound9, this.state.drumSound10, this.state.drumSound11, this.state.drumSound12, this.state.drumSound13, this.state.drumSound14, this.state.drumSound15, this.state.drumSound16]}
      />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    grid: state.grid,
  }
}

export default connect(mapState)(Tick)
