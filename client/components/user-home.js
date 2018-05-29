import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Drums from './drums'
import Instruments from './instruments'



/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <p className="jam">Welcome to Jam.Session!</p>
      <p> Join a Jam.Sesh </p>
      <form>
        <input />
        <button type='submit'>Submit</button>
      </form>
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
