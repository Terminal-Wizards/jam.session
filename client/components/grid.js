import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getGrid } from '../store'
import PlayBtn from './playBtn'
import socket from '../socket'

class Grid extends Component {

    onClick = event => {
        const cell = event.target
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        this.toggleState(x, y)
    }

    onKey = event => {
        console.log(`press`)
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
        const newGrid = [...this.props.grid]
        const { fetchGrid } = this.props
        newGrid[x][y] = !newGrid[x][y]
        fetchGrid(newGrid)
        socket.emit('newGrid', this.props.grid)
    }

    render() {
        document.onkeydown = this.onKey
        document.onkeyup = this.onKey
        const { grid } = this.props
        return (
            <div id="grid">
                <table>
                    <tbody>
                        {grid.map((x, xi) => {
                            return (
                                <tr key={xi} id={`row-${xi}`}>
                                    {x.map((y, yi) => {
                                        const cellId = `cell-${xi}-${yi}`
                                        const gridClass = y ? `alive` : ``
                                        return (
                                            <td
                                                id={cellId}
                                                key={cellId}
                                                className={gridClass}
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
    const { grid } = state
    return {
        grid
    }
}

const mapDispatch = dispatch => {
    return {
        fetchGrid: grid => {
            dispatch(getGrid(grid))
        }
    }
}

export default connect(mapState, mapDispatch)(Grid);
