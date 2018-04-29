import React from 'react'
import {connect} from 'react-redux'
import Sequencer from './sequencer'
import Grid from './grid'

const Drums = () => {
  return (
    <div>
      <Grid />
      {/* <Sequencer /> */}
    </div>
  )
}

const mapState = null

export default connect(mapState)(Drums)
