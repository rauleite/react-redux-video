// ------------------------------------
// Constants
// ------------------------------------
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function locationChange (location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    pathname: location.pathname,
    search: location.search
}
export default function locationReducer (state = initialState , action) {
  console.log('* locationReducer *')
  console.log('---- state', state)
  console.log('---- action', action)

  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}
