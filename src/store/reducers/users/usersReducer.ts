import {IUserState, UsersActionEnum, UsersActions} from "./type";

const initialState: IUserState = {
    users: [],
    lastNumber: 0,
}

export function usersReducer(
    state = initialState,
    action: UsersActions
): IUserState {
    switch (action.type) {
        case UsersActionEnum.SET_USERS:
            return {...state, users: action.payload, lastNumber: action.payload[action.payload.length - 1].number};
        case UsersActionEnum.ADD_USERS:
            return {...state, users: state.users.concat(action.payload), lastNumber: action.payload[action.payload.length - 1].number};
        case UsersActionEnum.CLEAN_USERS:
            return {...state, users: action.payload.users, lastNumber: 0};
        default:
            return state;
    }
}