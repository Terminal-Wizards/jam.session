import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSequencer, getStep } from '../store'

import socket from '../socket'
import PlayBtn from './playBtn';

let first = true;
class Sequencer extends Component {
  clickToggle = event => {
    const cell = event.target
    const x = +cell.id.split('-')[1], y = +cell.id.split('-')[2]
    this.toggleState(x, y)
  }

  dragToggle = event => {
    if (event.buttons != 1) return
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

  loadSeq = (newSequencer) => {
    this.props.fetchSequencer(newSequencer)
  }

  render() {
    const { sequencer } = this.props
    if (first) {
      first = false
      socket.on('sendSeq', newSequencer => {
        this.loadSeq(newSequencer)
      })
    }
    const beatArr = [[], [], [], []]
    sequencer.forEach((row, idx) => {
      if (idx < 4) beatArr[0].unshift(row[this.props.metronome])
      else if (idx < 8) beatArr[1].unshift(row[this.props.metronome])
      else if (idx < 12) beatArr[2].unshift(row[this.props.metronome])
      else beatArr[3].unshift(row[this.props.metronome])
    })
    this.props.fetchStep(beatArr)
    return (
      <div id="sequencer">
      {console.log('in render')}
        <table>
          <tbody>
            {sequencer.map((x, xi) => {
              return (
                <tr key={xi} id={`row-${xi}`}>
                  {x.map((y, yi) => {
                    const cellId = `cell-${xi}-${yi}`
                    const gridClass = y ? `alive` : ``
                    const seqClass = yi === this.props.metronome ? `active` : ``
                    return (
                      <td
                        id={cellId}
                        key={cellId}
                        className={`${gridClass} ${seqClass}`}
                        onMouseEnter={this.dragToggle}
                        onMouseDown={this.clickToggle}
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
  const { sequencer, metronome } = state
  return {
    sequencer,
    metronome
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
