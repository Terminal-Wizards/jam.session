import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSequencer } from '../store'

class Sequencer extends Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }

    onClick = event => {
        const cell = event.target
        const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
        this.toggleState(x, y)
    }

    toggleState = (x, y) => {
        const newSequencer = [...this.props.sequencer]
        const { fetchSequencer } = this.props
        newSequencer[x][y] = !newSequencer[x][y]
        fetchSequencer(newSequencer)
    }

    start = () => {
        let { count } = this.state
        setInterval(() => {
            count = (count + 1) % 16
            this.setState({ count })
        }, 125)

    }

    render() {
        const { count } = this.state
        const { sequencer } = this.props
        return (
            <div id="sequencer">
                <table>
                    <tbody>
                        {sequencer.map((x, xi) => {
                            return (
                                <tr key={xi} id={`row-${xi}`}>
                                    {x.map((y, yi) => {
                                        const cellId = `cell-${xi}-${yi}`
                                        const gridClass = y ? `alive` : ``
                                        const seqClass = yi === count ? `active` : ``
                                        return (
                                            <td
                                                id={cellId}
                                                key={cellId}
                                                className={`${gridClass} ${seqClass}`}
                                                onClick={this.onClick}
                                            />
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button onClick={this.start}>start</button>
            </div>
        )
    }
}

const mapState = state => {
    const { sequencer } = state
    return {
        sequencer
    }
}

const mapDispatch = dispatch => {
    return {
        fetchSequencer: sequencer => {
            dispatch(getSequencer(sequencer))
        }
    }
}

export default connect(mapState, mapDispatch)(Sequencer);
