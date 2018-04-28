/**
 * ACTION TYPES
 */
const GET_STEP = 'GET_STEP'

/**
 * INITIAL STATE
 */
const defaultStep = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

/**
 * ACTION CREATORS
 */

export const getStep = step => ({ type: GET_STEP, step })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultStep, action) {
  switch (action.type) {
    case GET_STEP:
      return action.step
    default:
      return state
  }
}
