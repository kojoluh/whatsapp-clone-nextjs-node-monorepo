import { reducerCases } from './constants';

export const initialState = {
    userInfo: undefined,
    isNewUser: false,

};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_NEW_USER: {
            return {
                ...state,
                isNewUser: action.isNewUser
            }
        }
        default:
            return state;
    }
};

export default reducer;