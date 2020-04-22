import * as actionTypes from '../actions/actions';

const initialState = {
    pocList: [],
    team:'All',
    loading: false
};

const pocReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POC_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.GET_POCLIST:
            return {
                ...state,
                pocList: action.payload.data,
                team: 'All',
                loading: false
            }; 
        case actionTypes.GET_POCTEAM:
            return {
                ...state,
                pocList: action.payload.data,
                team: action.payload.team,
                loading: false
            }; 
        case actionTypes.ADD_POC:
            const pocList = [...state.pocList];
            pocList.push(action.payload);
            return {
                ...state,
                pocList,
                loading: false
            };
        case actionTypes.EDIT_POC:
            const pocs = [...state.pocList];
            pocs[pocs.indexOf(action.payload.oldData)] = action.payload.newData;
            return { 
                ...state,
                pocList: pocs,
                loading: false
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