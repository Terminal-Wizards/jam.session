import React from 'react'
import {connect} from 'react-redux'
import Bass from './bass'
import Instruments from './instruments'

let toggle = true;
const instrumentsView = () => {
  return (
    <div>
      <button onClick={() => {
        console.log('click')
        toggle = !toggle
        console.log(toggle)
        }}>{toggle ? 'Bass' : 'Lead'}</button>
      {toggle ? <Instruments /> : <Bass />}
    </div>
  )
}

const mapState = null

export default connect(mapState)(instrumentsView)
