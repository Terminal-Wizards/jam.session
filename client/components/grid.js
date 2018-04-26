import React, { Component } from 'react';
import Beat from './beat'

const square = (s) => {
    const x = []
    const y = []
    for (let i = 0; i < s; i++) {
        x.push(i)
    }
    for (let i = 0; i < s; i++) {
        y.push(x.map(y => false))
    }
    return y;
}

class Grid extends Component {
    constructor() {
        super()
        this.state = { grid: square(4) }
    }

    cellClick = event => {
        const newGrid = this.toggleState(event.target)
        this.setState({ newGrid })
    }

    toggleState = (cell) => {
        const newGrid = [...this.state.grid]
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        newGrid[x][y] = !newGrid[x][y]
        return newGrid
    }

    render() {
        const { grid } = this.state
        console.log(grid)
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
                                            <td id={cellId} key={cellId} className={cellClass} onClick={this.cellClick} />
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Beat grid={grid} />
            </div>
        )
    }
}

export default Grid;
