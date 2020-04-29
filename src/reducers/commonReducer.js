import * as actionTypes from '../actions/actions';

const initialState = {
    roles: [],
    teams: [],
    type: '',
    message: ''
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLES:
            return {
                ...state,
                roles: action.payload.data
            };
        case actionTypes.GET_TEAMS:
            return {
                ...state,
                teams: action.payload.data
            };
        case actionTypes.SUCCESS:
            return {
                type: 'alert-success',
                message: action.payload.message
            };
        case actionTypes.ERROR:
            return {
                type: 'alert-danger',
                message: action.payload.message
            };
        case actionTypes.CLEAR:
            return {
                type: '',
                message: ''
            };
        default:
            return state;
    }   
}

export default commonReducer;