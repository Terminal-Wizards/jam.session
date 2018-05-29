import React from 'react'

import {Navbar, PlayBtn, Sequencer} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <div id="main">
        <Routes />
        {/* <Sequencer /> */}
      </div>
      <PlayBtn className="playBtn" />
    </div>
  )
}

export default App
