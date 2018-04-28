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
        console.log('grid rendered')
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
                <PlayBtn />
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
