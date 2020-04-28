import * as actionTypes from '../actions/actions';

const initialState = {
    roles: [],
    teams: []
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
        default:
            return state;
    }   
}

export default commonReducer;