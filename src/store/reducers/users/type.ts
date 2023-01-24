import {UsersType} from "../../../Types";


export interface IUserState {
    users: UsersType;
    lastNumber: number;
}

export enum UsersActionEnum {
    SET_USERS = 'SET_USERS',
    CLEAN_USERS = 'CLEAN_USERS',
    ADD_USERS = 'ADD_USERS',
}

export interface SetUsersAction {
    type: UsersActionEnum.SET_USERS;
    payload: UsersType;
}

export interface CleanUsersAction {
    type: UsersActionEnum.CLEAN_USERS;
    payload: { users: UsersType, lastNumber: number };
}

export interface AddUsersAction {
    type: UsersActionEnum.ADD_USERS;
    payload: UsersType;
}

export type UsersActions = SetUsersAction
    | CleanUsersAction
    | AddUsersAction;