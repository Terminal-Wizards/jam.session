/**
 * ACTION TYPES
 */
const GET_BASS = 'GET_BASS'

/**
 * INITIAL STATE
 */
const defaultBass = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

/**
 * ACTION CREATORS
 */

export const getBass = bass => ({ type: GET_BASS, bass })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultBass, action) {
  switch (action.type) {
    case GET_BASS:
      return action.bass
    default:
      return state
  }
}
