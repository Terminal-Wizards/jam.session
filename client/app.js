import React from 'react'

import {Navbar, PlayBtn, Sequencer} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Sequencer />
      <PlayBtn />
    </div>
  )
}

export default App
