import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getGrid } from '../store'

class Grid extends Component {

    cellClick = event => {
        const { fetchGrid } = this.props
        const newGrid = this.toggleState(event.target)
        fetchGrid(newGrid)
    }

    toggleState = cell => {
        const newGrid = [...this.props.grid]
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        newGrid[x][y] = !newGrid[x][y]
        return newGrid
    }

    render() {
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
                                            onClick={this.cellClick}
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
