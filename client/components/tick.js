import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';
import {connect} from 'react-redux'

const test = [
  true, false, false, false,
  true, false, false, true,
  true, false, true, false,
  true, false, false, false]

class Tick extends Component{
  constructor(props){
    super(props)
    this.state = {
      drumTick: 225,
      drumSound1: 15,
      drumSound2: 40,
      drumSound3: 49,
      drumSound4: 63,
      drumSound5: 111,
      drumSound6: 123,
      drumSound7: 77,
      drumSound8: 80,
      drumSound9: 92,
      drumSound10: 165,
      drumSound11: 144,
      drumSound12: 155,
      drumSound13: 133,
      drumSound14: 170,
      drumSound15: 181,
      drumSound16: 177,
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
      if (this.props.array[0]) {drums.push(this.state.drumSound1)}
      if (this.props.array[2]) {drums.push(this.state.drumSound2)}
      if (this.props.array[3]) {drums.push(this.state.drumSound3)}
      if (this.props.array[4]) {drums.push(this.state.drumSound4)}
      if (this.props.array[5]) {drums.push(this.state.drumSound5)}
      if (this.props.array[6]) {drums.push(this.state.drumSound6)}
      if (this.props.array[7]) {drums.push(this.state.drumSound7)}
      if (this.props.array[8]) {drums.push(this.state.drumSound8)}
      if (this.props.array[9]) {drums.push(this.state.drumSound9)}
      if (this.props.array[10]) {drums.push(this.state.drumSound10)}
      if (this.props.array[11]) {drums.push(this.state.drumSound11)}
      if (this.props.array[12]) {drums.push(this.state.drumSound12)}
      if (this.props.array[13]) {drums.push(this.state.drumSound13)}
      if (this.props.array[14]) {drums.push(this.state.drumSound14)}
      if (this.props.array[15]) {drums.push(this.state.drumSound15)}
      if (this.props.array[16]) {drums.push(this.state.drumSound16)}
      var beat = [drums, instrus]
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

const mapState = () => ({
  array: test,
})

export default connect(mapState)(Tick)
