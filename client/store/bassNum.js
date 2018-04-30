/**
 * ACTION TYPES
 */
const GET_BASS_NUM = 'GET_BASS_NUM'

/**
 * INITIAL STATE
 */
const defaultBass = 430

/**
 * ACTION CREATORS
 */

export const getBassNum = bass => ({ type: GET_BASS_NUM, bass })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultBass, action) {
  switch (action.type) {
    case GET_BASS_NUM:
      return action.bass
    default:
      return state
  }
}
