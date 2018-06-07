import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav className="nav-bar">
        <a id="title" href="https://github.com/chrisstephenmiller/jam-session" target="_blank" rel="noopener noreferrer">
          <h1 className="jam">JAM.SOCKETS</h1>
          <img className="github" src="./github.png" />
        </a>
      <div id="links">
        <NavLink to="/drums" className="link" activeClassName="highlight">Drums</NavLink>
        <NavLink to="/lead" className="link" activeClassName="highlight">Lead</NavLink>
        <NavLink to="/bass" className="link" activeClassName="highlight">Bass</NavLink>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
