/**
 * ACTION TYPES
 */
const GET_BEAT = 'GET_BEAT'

/**
 * INITIAL STATE
 */
const defaultBeat = 1;

/**
 * ACTION CREATORS
 */
export const getBeat = beat => ({type: GET_BEAT, beat})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultBeat, action) {
  switch (action.type) {
    case GET_BEAT:
      return action.beat
    default:
      return state
  }
}
