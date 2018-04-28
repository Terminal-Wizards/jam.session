/**
 * ACTION TYPES
 */
const GET_LEAD = 'GET_LEAD'

/**
 * INITIAL STATE
 */
const defaultLead = 44

/**
 * ACTION CREATORS
 */

export const getLead = lead => ({ type: GET_LEAD, lead })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultLead, action) {
  switch (action.type) {
    case GET_LEAD:
      return action.lead
    default:
      return state
  }
}
