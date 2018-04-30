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
        Digit7: [0, 0],
        Digit8: [0, 1],
        Digit9: [0, 2],
        Digit0: [0, 3],
        KeyU: [1, 0],
        KeyI: [1, 1],
        KeyO: [1, 2],
        KeyP: [1, 3],
        KeyJ: [2, 0],
        KeyK: [2, 1],
        KeyL: [2, 2],
        Semicolon: [2, 3],
        KeyM: [3, 0],
        Comma: [3, 1],
        Period: [3, 2],
        Slash: [3, 3]
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
                <select onChange={this.changeBassNum}>
                  <option value={430}>Synth Bass</option>
                  <option value={435}>Synth Bass 2</option>
                  <option value={382}>Sub Bass</option>
                </select>
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
