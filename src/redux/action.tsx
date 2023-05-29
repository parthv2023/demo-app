import * as types from "./actiontype";
import axios from "axios";

const userAdded = () => ({
    type: types.ADD_USER,
});

const userDelete = () => ({
    type: types.DELETE_USER,
})

const getUsers = (users: any) => ({
    type: types.GET_USER,
    payload: users,
});
const getUsersdatas = (userss: any) => ({
    type: types.GETUSER_DATA,
    payload: userss,
});
const userUpdated = () => ({
    type: types.UPDATE_USER,
});


const Getuser = (user:any) => ({
    type: types.GET_SINGLE_USER,
    payload: user,
});


export const addUsers = (user:any) => {
    return  function (dispatch: any) {
        axios
        .post(`${process.env.REACT_APP_API}`, user)
        .then((resp) => {
            console.log("resp", resp.data)
            dispatch(userAdded());
        }).catch(error => console.log("error-adduser", error));
    }
};

export const loadUsers = () => {
    return  function (dispatch:any) {
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            dispatch(getUsers(resp.data));
        }).catch(error => console.log(error));
    }
};

export const deleteUser = (id: any) => {
    return  function (dispatch: any) {
        axios
        .delete(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp", resp)
            dispatch(userDelete());
            dispatch(loadUsers());
        }).catch(error => console.log("error", error));
    }
};

export const getUsersdata = () => {
    return  function (dispatch: any) {
        axios
        .get(`${process.env.REACT_APP_API}`)
        .then((resp) => {
            console.log("resp.data2", resp.data.name);
            dispatch(getUsersdatas(resp.data));
        }).catch(error => console.log(error));
    }
};

export const getSingleuser = (id:any) => {
    return  function (dispatch:any) {
        axios
        .get(`${process.env.REACT_APP_API}/${id}`)
        .then((resp) => {
            console.log("resp2", resp.data)
            dispatch(Getuser(resp.data));
     
        }).catch(error => console.log("error", error));
    }
};

export const Updateuser = (user:any, id: any) => {
    return  function (dispatch:any) {
        axios
        .put(`${process.env.REACT_APP_API}/${id}`, user)
        .then((resp) => {
            dispatch(userUpdated());
     
        }).catch(error => console.log("error", error));
    }
};