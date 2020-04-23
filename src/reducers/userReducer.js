import * as actionTypes from '../actions/actions';

const initialState = {
    user: {},
    users: [],
    loading: false
}
  
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return {
          ...state,
          loading: true
      };
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
    case actionTypes.GET_USERSIST:
      return {
          ...state,
          users: action.payload.data,
          loading: false
      }; 
    case actionTypes.EDIT_USER: {
      const users = [...state.users];
      users[users.indexOf(action.payload.oldData)] = action.payload.newData;
      return { 
          ...state,
          users: users,
          loading: false
      }; 
    }
      
    case actionTypes.DELETE_USER: { 
      const users = [...state.users];
      users.splice(users.indexOf(action.payload.oldData), 1);
      return {
          ...state,
          users: users,
          loading: false
      }; 
    }    

    default:
      return state;
  }
}

export default userReducer