import {UsersType} from "../../../Types";
import {AddUsersAction, CleanUsersAction, SetUsersAction, UsersActionEnum} from "./type";

export const UsersActionCreator = {
    setUsers: (users: UsersType): SetUsersAction => ({
        type: UsersActionEnum.SET_USERS, payload: users
    }),
    addUsers: (users: UsersType): AddUsersAction => ({
        type: UsersActionEnum.ADD_USERS, payload: users
    }),
    cleanUsers: (): CleanUsersAction => ({
        type: UsersActionEnum.CLEAN_USERS, payload: {users: [], lastNumber: 0}
    })
}