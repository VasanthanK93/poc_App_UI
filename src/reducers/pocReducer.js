import * as actionTypes from '../actions/actions';

const initialState = {
    pocList: [],
    team:'All'
};

const pocReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POCLIST:
            return {
                ...state,
                pocList: action.payload.data,
                team: 'All'
            }; 
        case actionTypes.GET_POCTEAM:
            return {
                ...state,
                pocList: action.payload.data,
                team: action.payload.team
            }; 
        case actionTypes.ADD_POC:
            const pocList = [...state.pocList];
            pocList.push(action.payload);
            return {
                ...state,
                pocList
            };
        case actionTypes.EDIT_POC:
            const pocs = [...state.pocList];
            pocs[pocs.indexOf(action.payload.oldData)] = action.payload.newData;
            return { 
                ...state,
                pocList: pocs
            }; 
        case actionTypes.REMOVE_POC:
            return {
                ...state,
                pocList: state.pocList.filter(
                    poc => poc.id !== action.payload
                )
            }; 
        default:
            return state;
    }   
}

export default pocReducer;