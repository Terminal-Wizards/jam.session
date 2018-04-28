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

const reducer = combineReducers({user, grid, sequencer, step, instruments, lead})

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
