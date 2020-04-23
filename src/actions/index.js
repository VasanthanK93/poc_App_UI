import * as actionTypes from './actions';
import axios from 'axios';
import { history } from '../helpers/history';

const pocLoadingAction = () =>{
    return{
        type: actionTypes.POC_LOADING
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

const userLoadingAction = () =>{
    return{
        type: actionTypes.USER_LOADING
    }
}

const getUsersListAction = (data) =>{
    return{
        type: actionTypes.GET_USERSIST ,
        payload: {
            data
        }
    }
}

const editUserAction = (newData,oldData) =>{
    return{
        type: actionTypes.EDIT_USER ,
        payload: {
            newData,
            oldData
        } 
    }
}

const deleteUserAction = (oldData) =>{
    return{
        type: actionTypes.DELETE_USER ,
        payload: {
            oldData
        } 
    }
}

export const getPocList = () => 
    async dispatch => {
      dispatch(pocLoadingAction())
      const res = await axios.get("https://pocnodebby.herokuapp.com/poc/v1/getPocList")
      dispatch(getPocListAction(res.data))
    }

export const getPocTeam = (team) => 
    async dispatch => {
        dispatch(pocLoadingAction())
        const res = await axios.get( "https://pocnodebby.herokuapp.com/poc/v1/getPocTeam/"+team)
        dispatch(getPocTeamAction(res.data,team))
    }

export const addPoc = (poc) => 
    async dispatch => {
        dispatch(pocLoadingAction())
        let url = "https://pocnodebby.herokuapp.com/poc/v1/addPoc/"+poc.team
        const res = await axios.post(url,poc)  
        dispatch(addPocAction(res.data))
    }

export const editPoc = (newData,oldData) =>
    async dispatch => {
        dispatch(pocLoadingAction())
        let url = "https://pocnodebby.herokuapp.com/poc/v1/editPoc/"+newData.team
        const res = await axios.put(url,newData)  
        dispatch(editPocAction(res.data,oldData)) 
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

export const getUsersList = () => 
    async dispatch => {
        dispatch(userLoadingAction())
        let url = "https://pocnodebby.herokuapp.com/user/v1/getUsersList/"
        const res = await axios.get(url)
        dispatch(getUsersListAction(res.data))
    }

export const editUser = (newData,oldData) =>
    async dispatch => {
        dispatch(userLoadingAction())
        let url = "https://pocnodebby.herokuapp.com/user/v1/editUser/"+oldData.userName
        const res = await axios.put(url,newData)  
        dispatch(editUserAction(res.data,oldData)) 
    }

export const getProfile = () => 
    async dispatch => {
        let user =JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch(loginUserAction(user))   
        }else{       
            localStorage.removeItem('user')
            history.push('/')  
        }
    }

export const deleteUser = (oldData) => 
    async dispatch => {
        dispatch(userLoadingAction())
        let user = {...oldData,"active" : false}
        let url = "https://pocnodebby.herokuapp.com/user/v1/editUser/"+oldData.userName
        const res = await axios.put(url,user)  
        console.log(res)
        dispatch(deleteUserAction(oldData))
    }