import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Sequencer from './sequencer'
import Grid from './grid'
import Instruments from './instruments'
import PlayBtn from './playBtn'


/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <div>
      <Grid />
      <Sequencer />
      </div>
      <div>
      <Instruments />
      </div>
      <PlayBtn />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
