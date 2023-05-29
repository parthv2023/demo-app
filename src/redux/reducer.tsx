import React from "react";
import * as types from "./actiontype";

const initialState = {
    users: [],
    user:{},
    userss:[],
    searchResults: [],
    loading: true
}

const userReducers = (state = initialState, action:any) => {
    switch(action.type) {
        case types.GET_USER:
            console.log("action.payload", action.payload);
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case types.DELETE_USER:
        case types.ADD_USER:
            return{
                ...state,
                loading: false, 
            }
        default: 
            return state;
    }
};

export default userReducers;