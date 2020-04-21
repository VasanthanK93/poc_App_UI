import * as actionTypes from './actions';
import axios from 'axios';
import { history } from '../helpers/history';

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

const loginUserAction = data => {
    return{
        type: actionTypes.LOGIN_USER,
        payload: data
    }  
}

const logoutUserAction = () => {
    return{
        type: actionTypes.LOGOUT_USER
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

export const loginUser = (user) => 
    async dispatch => {
        let url = "https://pocnodebby.herokuapp.com/user/v1/authenticate/"
        const res = await axios.post(url,user)
        if(res.data.status === "Success"){
            const user = res.data.data.user
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(loginUserAction(user))
            history.push('/')  
        }else{       
            // error handling
        }
    }

export const logoutUser = () => 
    async dispatch => {
        localStorage.removeItem('user')
        dispatch(logoutUserAction())
    } 

export const registerUser = (user) => 
    async dispatch => {
        let url = "https://pocnodebby.herokuapp.com/user/v1/register/"
        const res = await axios.post(url,user)  
        if(res.data.status === "success"){
            const user = res.data.data
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(loginUserAction(user))
            history.push('/')  
        }else{       
            // error handling
        }
    }

