import * as actionTypes from './actions';
import axios from 'axios';

const loadingAction = () =>{
    return{
        type: actionTypes.LOADING
    }
}

const getPocListAction = (data) =>{
    return{
        type: actionTypes.GET_POCLIST ,
        payload: {
            data
        }
    }
}

const getPocTeamAction = (data,team) =>{
    return{
        type: actionTypes.GET_POCTEAM ,
        payload: {
            data,
            team
        }
    }
}

const addPocAction = data =>{
    return{
        type: actionTypes.ADD_POC ,
        payload: data
    }
}

const editPocAction = (newData,oldData) =>{
    return{
        type: actionTypes.EDIT_POC ,
        payload: {
            newData,
            oldData
        } 
    }
}

const removePocAction = data =>{
    return{
        type: actionTypes.REMOVE_POC,
        payload: data
    }
}


export const getPocList = () => 
    async dispatch => {
      dispatch(loadingAction())
      const res = await axios.get("https://pocnodebby.herokuapp.com/poc/v1/getPocList")
      dispatch(getPocListAction(res.data))
    }

export const getPocTeam = (team) => 
    async dispatch => {
        dispatch(loadingAction())
        const res = await axios.get( "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+team)
        dispatch(getPocTeamAction(res.data,team))
    }

export const addPoc = (poc) => 
    async dispatch => {
        dispatch(loadingAction())
        let url = "https://pocnodebby.herokuapp.com/poc/v1/addPoc/"+poc.team
        const res = await axios.post(url,poc)  
        dispatch(addPocAction(res.data))
    }

export const editPoc = (newData,oldData) =>
    async dispatch => {
        dispatch(loadingAction())
        let url = "https://pocnodebby.herokuapp.com/poc/v1/editPoc/"+newData.team
        const res = await axios.put(url,newData)  
        dispatch(editPocAction(res.data,oldData)) 
    }

export const removePoc = id => 
    async dispatch => {
        await axios.delete("http://" +id)
        dispatch(removePocAction(id))
    }

