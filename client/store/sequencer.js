import { O_NOFOLLOW } from "constants";

/**
 * ACTION TYPES
 */
const GET_SEQUENCER = 'GET_SEQUENCER'
const UPDATE_SEQUENCER = 'UPDATE_SEQUENCER'

/**
 * INITIAL STATE
 */
const defaultSequencer = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
]

/**
 * ACTION CREATORS
 */

export const getSequencer = sequencer => ({ type: GET_SEQUENCER, sequencer })
export const updateSequencer = (count, step) => ({ type: UPDATE_SEQUENCER, count, step })

/**
 * THUNK CREATORS
 */

const flopSeq = (seq) => {
  var newSeq = []
  for (var i = 0; i < 16; i++) {
      var temp = []
      seq.forEach(row => {
          temp.unshift(row[i])
      })
      newSeq.push(temp)
  }
  return newSeq
}

const flapSeq = (seq) => {
  var newSeq = []
  for (var i = 0; i < 16; i++) {
      var temp = []
      seq.forEach(row => {
          temp.push(row[i])
      })
      newSeq.unshift(temp)
  }
  return newSeq
}

const handleUpdate = (state, action) => {
  var flopper = flopSeq(state)
  flopper = flopper.map((step,idx) => (idx === action.count ? action.step : step))
  return flapSeq(flopper)
}

/**
 * REDUCER
 */
export default function (state = defaultSequencer, action) {
  switch (action.type) {
    case GET_SEQUENCER:
      return action.sequencer
    case UPDATE_SEQUENCER:
      return handleUpdate(state, action)
      
    default:
      return state
  }
}
