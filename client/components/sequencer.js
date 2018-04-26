import React, { Component } from 'react';
import Tick from './tick'
import Beat from './beat'
import { connect } from 'react-redux'
import { getGrid } from '../store'

class Sequencer extends Component {

    onClick = event => {
        const cell = event.target
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        this.toggleState(x, y)
    }

    toggleState = (x, y) => {
        const newGrid = [...this.props.grid]
        const { fetchGrid } = this.props
        newGrid[x][y] = !newGrid[x][y]
        fetchGrid(newGrid)
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

export default connect(mapState, mapDispatch)(Sequencer);
