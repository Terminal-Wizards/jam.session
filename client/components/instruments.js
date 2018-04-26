import React, { Component } from 'react';
import Tick from './tick'
import Beat from './beat'
import { connect } from 'react-redux'
import { getGrid, getInstruments } from '../store'

class Instruments extends Component {

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
        const newInstruments = [...this.props.instruments]
        const { fetchInstruments } = this.props
        newInstruments[x][y] = !newInstruments[x][y]
        fetchInstruments(newInstruments)
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
                <Tick />
            </div>
        )
    }
}

export const startBeat = () => {
  console.log('yeeee')
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
        }
    }
}

export default connect(mapState, mapDispatch)(Instruments);
