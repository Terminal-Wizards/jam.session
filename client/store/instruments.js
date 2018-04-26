/**
 * ACTION TYPES
 */
const GET_INSTRUMENTS = 'GET_INSTRUMENTS'

/**
 * INITIAL STATE
 */
const defaultInstruments = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

/**
 * ACTION CREATORS
 */

export const getInstruments = instruments => ({ type: GET_INSTRUMENTS, instruments })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultInstruments, action) {
  switch (action.type) {
    case GET_INSTRUMENTS:
      return action.instruments
    default:
      return state
  }
}
