import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';
import {connect} from 'react-redux'

class Tick extends Component{
  constructor(props){
    super(props)
    this.state = {
      drumTick: 225,
      drumSnare: 15,
      tick: [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false],
      pos1: false
    }
    this.play = false
    this.state.data=[]
    this.beats = []
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  mouseDown = async () => {
    await this.setState({pos1: true})
    this.fillBeat()
  }

  mouseUp = async () => {
    await this.setState({pos1: false})
    this.fillBeat()
  }

  fillBeat(){
    for (var i = 0; i < 16; i++){
      var drums = [];
      if (this.state.tick[i]) {drums.push(this.state.drumTick)}
      if (this.state.pos1) {drums.push(this.state.drumSnare)}
      var beat = [drums, []]
      this.beats[i] = beat
    }
  }
  playLoop = () =>{
		this.fillBeat()
		this.midiSounds.startPlayLoop(this.beats, 120, 1 / 16)
	}
	stopLoop = () => {
		this.midiSounds.stopPlayLoop()
  }

  render(){
    var cool = this
    return(
      <div>
        <button onClick={this.playLoop}>Play loop</button>
        <button onClick={this.stopLoop}>Stop loop</button>
        <button onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>Snare</button>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="app"
        drums={[this.state.drumTick, this.state.drumSnare]}
      />
      </div>
    )
  }
}

const mapState = null

export default connect(mapState)(Tick)
