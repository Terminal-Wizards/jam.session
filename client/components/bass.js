import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { getBass, getBassNum } from '../store'
import socket from '../socket'

class Bass extends Component {
    constructor(){
      super()
      this.state = {
        bass: 430,
      }
    }
    onClick = event => {
        const cell = event.target
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        this.toggleState(x, y)
    }

    onKey = event => {
        if (event.repeat) return
        const { code } = event
        if (!this.keyMap[code]) return
        const x = this.keyMap[code][0], y = this.keyMap[code][1]
        this.toggleState(x, y)
    }

    keyMap = {
      Digit1: [0, 0],
      Digit2: [0, 1],
      Digit3: [0, 2],
      Digit4: [0, 3],
      KeyQ: [1, 0],
      KeyW: [1, 1],
      KeyE: [1, 2],
      KeyR: [1, 3],
      KeyA: [2, 0],
      KeyS: [2, 1],
      KeyD: [2, 2],
      KeyF: [2, 3],
      KeyZ: [3, 0],
      KeyX: [3, 1],
      KeyC: [3, 2],
      KeyV: [3, 3]
  }

    toggleState = (x, y) => {
        const newBass = [...this.props.bass]
        const { fetchBass } = this.props
        newBass[x][y] = !newBass[x][y]
        fetchBass(newBass)
        socket.emit('newBass', newBass)
    }

    changeBassNum = (event) => {
      this.props.fetchBassNum(event.target.value)
    }

    render() {
        document.onkeydown = this.onKey
        document.onkeyup = this.onKey
        const { bass } = this.props
        return (
            <div id="grid">
                <table>
                    <tbody>
                        {bass.map((x, xi) => {
                            return (
                                <tr key={xi} id={`row-${xi}`}>
                                    {x.map((y, yi) => {
                                        const cellId = `cell-${xi}-${yi}`
                                        const cellClass = y ? `alive` : ``
                                        return (
                                            <td
                                                id={cellId}
                                                key={cellId}
                                                className={cellClass}
                                                onClick={this.onClick}
                                            />
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>Select an Instrument</div>
                <select onChange={this.changeBassNum}>
                  <option value={430}>Synth Bass</option>
                  <option value={435}>Synth Bass 2</option>
                  <option value={382}>Sub Bass</option>
                </select>
            </div>
        )
    }
}

const mapState = state => {
    const { bass } = state
    return {
        bass
    }
}

const mapDispatch = dispatch => {
    return {
        fetchBass: bass => {
            dispatch(getBass(bass))
        },
        fetchBassNum: bass => {
          dispatch(getBassNum(bass))
        }
    }
}

export default connect(mapState, mapDispatch)(Bass);
