import React, { Component } from 'react';
import { connect } from 'react-redux'
import  { getInstruments, getLead } from '../store'
import PlayBtn from './playBtn'
import socket from '../socket'

class Instruments extends Component {
    constructor(){
      super()
      this.state = {
        lead: 44,
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
        const newInstruments = [...this.props.instruments]
        const { fetchInstruments } = this.props
        newInstruments[x][y] = !newInstruments[x][y]
        fetchInstruments(newInstruments)
        socket.emit('newInstrument', newInstruments)
    }

    changeLead = (event) => {
      this.props.fetchLead(event.target.value)
    }

    render() {
        document.onkeydown = this.onKey
        document.onkeyup = this.onKey
        const { instruments } = this.props
        return (
            <div id="grid">
                <table>
                    <tbody>
                        {instruments.map((x, xi) => {
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
                <select onChange={this.changeLead}>
                  <option value={44}>Electric Piano</option>
                  <option value={123}>Vibraphone</option>
                  <option value={868}>Synth Lead</option>
                  <option value={794}>Pan Flute</option>
                  <option value={929}>Synth Pad</option>
                  <option value={921}>Synth Lead 2</option>
                  <option value={1110}>Spooky Synth</option>
                </select>
            </div>
        )
    }
}

const mapState = state => {
    const { instruments } = state
    return {
        instruments
    }
}

const mapDispatch = dispatch => {
    return {
        fetchInstruments: instrument => {
            dispatch(getInstruments(instrument))
        },
        fetchLead: lead => {
          dispatch(getLead(lead))
        }
    }
}

export default connect(mapState, mapDispatch)(Instruments);
