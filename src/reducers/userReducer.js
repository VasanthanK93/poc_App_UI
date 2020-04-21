import * as actionTypes from '../actions/actions';

const initialState = {
    user: {}
}
  
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.LOGOUT_USER:
        return {
            ...state,
            user: {}
          }
    default:
      return state;
  }
}

export default userReducer