import * as actionTypes from './actions';
import axios from 'axios';

const getPocListAction = (data,team) =>{
    return{
        type: actionTypes.GET_POCLIST ,
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

const editPocAction = (data,index) =>{
    return{
        type: actionTypes.EDIT_POC ,
        payload: {
            data,
            index
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
      const res = await axios.get("https://pocnodebby.herokuapp.com/poc/v1/getPocList")
      dispatch(getPocListAction(res.data,'All'))
    }

export const getPocTeam = (team) => 
    async dispatch => {
        const res = await axios.get( "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+team)
        dispatch(getPocListAction(res.data,team))
    }

export const addPoc = (poc,team) => 
    async dispatch => {
        let data = {...poc,"team": team,"deleteStatus" : false}
        let url = "https://pocnodebby.herokuapp.com/poc/v1/addPoc/"+team
        const res = await axios.post(url,data)  
        dispatch(addPocAction(res.data))
    }

export const editPoc = (poc,index,team) => 
    async dispatch => {
        let url = "https://pocnodebby.herokuapp.com/poc/v1/editPoc/"+team
        const res = await axios.put(url,poc)  
        dispatch(editPocAction(res.data,index)) 
    }

export const removePoc = id => 
    async dispatch => {
        await axios.delete(`http://localhost:8080/team/${id}`)
        dispatch(removePocAction(id))
    }

