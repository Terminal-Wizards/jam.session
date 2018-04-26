import React, { Component } from 'react';
import Tick from './tick'
import Beat from './beat'
import { connect } from 'react-redux'
import { getGrid } from '../store'

class Grid extends Component {

    onClick = event => {
        const {fetchGrid} = this.props
        const cell = event.target
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        const newGrid = this.toggleState(x, y)
        fetchGrid(newGrid)
    }

    toggleState = (x, y) => {
        const newGrid = [...this.props.grid]
        newGrid[x][y] = !newGrid[x][y]
        return newGrid
    }

    onKeyDown = event => {
        const {fetchGrid} = this.props
        const { code } = event
        const x = this.keyCheck(code)[0], y = this.keyCheck(code)[1]
        const newGrid = this.toggleState(x, y)
        fetchGrid(newGrid)
    }

    onKeyUp = event => {
        const {fetchGrid} = this.props
        const { code } = event
        const x = this.keyCheck(code)[0], y = this.keyCheck(code)[1]
        const newGrid = this.toggleState(x, y)
        fetchGrid(newGrid)
    }

    keyCheck = code => {
        const keyMap = {
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

        return keyMap[code]
    }

    render() {
        document.onkeydown = this.onKeyDown
        document.onkeyup = this.onKeyUp
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
                <Tick sounds={grid} />
                <Beat grid={grid} />
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
