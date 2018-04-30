import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import grid from './grid'
import sequencer from './sequencer'
import instruments from './instruments'
import lead from './lead'
import step from './step'
import metronome from './metronome'
import bass from './bass'
import bassNum from './bassNum'

const reducer = combineReducers({user, grid, sequencer, step, instruments, lead, metronome, bass, bassNum})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  // createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './grid'
export * from './sequencer'
export * from './instruments'
export * from './lead'
export * from './step'
export * from './metronome'
export * from './bass'
export * from './bassNum'
