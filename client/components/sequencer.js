import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSequencer, getStep } from '../store'

import socket from '../socket'
import PlayBtn from './playBtn';

let first = true;
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
    socket.emit('newSeq', newSequencer)
  }

  start = () => {
    let { count } = this.state
    setInterval(() => {
      count = (count + 1) % 16
      this.setState({ count })
    }, 125)

  }

  loadSeq = (newSequencer) => {
    this.props.fetchSequencer(newSequencer)
  }

  render() {
    const { count } = this.state
    const { sequencer } = this.props
    if (first) {
      first = false
      socket.on('beat', count => {
        count = (count + 1) % 16
        this.setState({ count })
      })
      socket.on('sendSeq', newSequencer => {
        this.loadSeq(newSequencer)
      })
    }
    const beatArr = [[], [], [], []]
    sequencer.forEach((row, idx) => {
      if (idx < 4) beatArr[0].unshift(row[count])
      else if (idx < 8) beatArr[1].unshift(row[count])
      else if (idx < 12) beatArr[2].unshift(row[count])
      else beatArr[3].unshift(row[count])
    })
    this.props.fetchStep(beatArr)
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
    },
    fetchStep: step => {
      dispatch(getStep(step))
    }
  }
}

export default connect(mapState, mapDispatch)(Sequencer);
