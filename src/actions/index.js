import * as actionTypes from './actions';
import axios from 'axios';
import { history } from '../helpers/history';
import { authHeader } from '../helpers/authHeader'

const baseUrl = "https://pocnodebby.herokuapp.com/"
//const baseUrl = "http://localhost:8080/"

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

const getPocLogAction = (data) =>{
    return{
        type: actionTypes.GET_POCLOG ,
        payload: {
            data
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

const getRolesAction = (data) =>{
    return{
        type: actionTypes.GET_ROLES ,
        payload: {
            data
        }
    }
}

const getTeamsAction = (data) =>{
    return{
        type: actionTypes.GET_TEAMS ,
        payload: {
            data
        }
    }
}


const successAction = (message) =>{
    return{
        type: actionTypes.SUCCESS ,
        payload: {
            message
        }
    }
}

const errorAction = (message) =>{
    return{
        type: actionTypes.ERROR ,
        payload: {
            message
        }
    }
}

export const clearAction = () =>{
    return{
        type: actionTypes.CLEAR 
    }
}

export const getPocList = () => 
    async dispatch => {
      dispatch(pocLoadingAction())
      const res = await axios.get(baseUrl+"poc/v1/getPocList",{headers: authHeader()})
      dispatch(getPocListAction(res.data))
    }

export const getPocTeam = (team) => 
    async dispatch => {
        dispatch(pocLoadingAction())
        const res = await axios.get( baseUrl+"poc/v1/getPocTeam/"+team,{headers: authHeader()})
        dispatch(getPocTeamAction(res.data,team))
    }

export const addPoc = (poc) => 
    async dispatch => {
        dispatch(pocLoadingAction())
        let url = baseUrl+"poc/v1/addPoc/"+poc.team
        const res = await axios.post(url,poc,{headers: authHeader()})  
        dispatch(addPocAction(res.data))
    }

export const editPoc = (newData,oldData) =>
    async dispatch => {
        dispatch(pocLoadingAction())
        let url = baseUrl+"poc/v1/editPoc/"+newData.team
        const res = await axios.put(url,newData,{headers: authHeader()})  
        dispatch(editPocAction(res.data,oldData)) 
    }

export const loginUser = (user) => 
    async dispatch => {
        let url = baseUrl+"auth/v1/authenticate/"
        const res = await axios.post(url,user)
        if(res.data.status === "Success"){
            const user = res.data.data
            sessionStorage.setItem('user', JSON.stringify(user));
            dispatch(loginUserAction(user))
            history.push('/')  
        }else{       
            dispatch(errorAction(res.data.message));
        }
    }

export const logoutUser = () => 
    async dispatch => {
        sessionStorage.removeItem('user')
        dispatch(logoutUserAction())
    } 

export const registerUser = (user) => 
    async dispatch => {
        let usr = {...user,"role": "Team Member"}
        let url = baseUrl+"auth/v1/register/"
        const res = await axios.post(url,usr)  
        if(res.data.status === "success"){
            //const user = res.data.data
            //localStorage.setItem('user', JSON.stringify(user));  
            history.push('/login')  
            dispatch(successAction(res.data.message));
        }else{       
            dispatch(errorAction(res.data.message));
        }
    }

export const resetPassword = (user) => 
    async dispatch => {
        let url = baseUrl+"auth/v1/resetPwd/"+user.userName
        const res = await axios.put(url,{'password': user.newPassword})
        if(res.data.Status === "Error"){     
            dispatch(errorAction(res.data.message));
        }else{       
            dispatch(successAction("Password Reset Successfully"));
        }
    }

export const getUsersList = () => 
    async dispatch => {
        dispatch(userLoadingAction())
        let url = baseUrl+"user/v1/getUsersList/"
        const res = await axios.get(url,{headers: authHeader()})
        const activeUsers = res.data.filter( user => user.userActive !== false)
        dispatch(getUsersListAction(activeUsers))
    }

export const editUser = (newData,oldData) =>
    async dispatch => {
        dispatch(userLoadingAction())
        let url = baseUrl+"user/v1/editUser/"+oldData.userName
        const res = await axios.put(url,newData,{headers: authHeader()})  
        dispatch(editUserAction(res.data,oldData)) 
    }

export const getProfile = () => 
    async dispatch => {
        let user =JSON.parse(sessionStorage.getItem('user'))
        if(user){
            dispatch(loginUserAction(user)) 
        }else{     
            sessionStorage.removeItem('user')
            history.push('/')  
        }
    }

export const deleteUser = (oldData) => 
    async dispatch => {
        dispatch(userLoadingAction())
        let user = {...oldData,"userActive" : false}
        let url = baseUrl+"user/v1/editUser/"+oldData.userName
        await axios.put(url,user,{headers: authHeader()})  
        dispatch(deleteUserAction(oldData))
    }

export const getRoles = () => 
    async dispatch => {
        let url = baseUrl+"role/v1/getRoles/"
        const res = await axios.get(url,{headers: authHeader()})
        dispatch(getRolesAction(res.data))
    }

export const getTeams = () => 
    async dispatch => {
        let url = baseUrl+"team/v1/getTeams/"
        const res = await axios.get(url,{headers: authHeader()})
        dispatch(getTeamsAction(res.data))
    }

export const getPocLog = (pocId) => 
    async dispatch => {
        dispatch(pocLoadingAction())
        const res = await axios.get( baseUrl+"pocHistory/v1/getPocHistory/"+pocId,{headers: authHeader()})
        dispatch(getPocLogAction(res.data))
    }