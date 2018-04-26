/**
 * ACTION TYPES
 */
const GET_GRID = 'GET_GRID'

/**
 * INITIAL STATE
 */
const defaultGrid = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

/**
 * ACTION CREATORS
 */

export const getGrid = grid => ({ type: GET_GRID, grid })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultGrid, action) {
  switch (action.type) {
    case GET_GRID:
      return action.grid
    default:
      return state
  }
}
