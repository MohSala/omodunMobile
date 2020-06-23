import axios from 'axios';
import { AsyncStorage } from 'react-native';

import {
    LOGIN_WITH_PHONE_ACTION_TYPES,
    FORGOT_PASSWORD_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES,
    CHECK_ACCOUNT_ACTION_TYPES,
    VERIFY_USER_ACTION_TYPES,
    ADD_EMAIL_ACTION_TYPES
} from "./actionTypes";


const {
    LOGIN_WITH_PHONE_FULFILLED,
    LOGIN_WITH_PHONE_REJECTED,
    LOGIN_WITH_PHONE_REQUEST
} = LOGIN_WITH_PHONE_ACTION_TYPES;

const {
    CHECK_ACCOUNT_FULFILLED,
    CHECK_ACCOUNT_REJECTED,
    CHECK_ACCOUNT_REQUEST
} = CHECK_ACCOUNT_ACTION_TYPES;

const {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FULFILLED,
    FORGOT_PASSWORD_REJECTED
} = FORGOT_PASSWORD_ACTION_TYPES;

const {
    VERIFY_USER_FULFILLED,
    VERIFY_USER_REJECTED,
    VERIFY_USER_REQUEST
} = VERIFY_USER_ACTION_TYPES

const {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_FULFILLED,
    CREATE_ACCOUNT_REJECTED
} = CREATE_ACCOUNT_ACTION_TYPES;

const {
    ADD_EMAIL_FULFILLED,
    ADD_EMAIL_REJECTED,
    ADD_EMAIL_REQUEST
} = ADD_EMAIL_ACTION_TYPES

const BASE_URL = "http://127.0.0.1:7300";

// THUNKS
const checkForUser = data => {
    return async (dispatch) => {
        dispatch(checkUserRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/checkUser`,
                data
            )
            const dataCode = response.data
            console.log(dataCode)
            return dispatch(checkUserFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(checkUserRejected(e));
        }
    }
}

const loginWithNumber = data => {
    return async (dispatch) => {
        dispatch(loginWithNumberRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                data
            );
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            // save token and user details to local storage
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("mobile", user.user.mobile)
            return dispatch(loginWithNumberFulfilled(user));
        } catch (e) {
            console.log(e);
            dispatch(loginWithNumberRejected(e));
        }
    };
};

const verifyUserOtp = data => {
    return async (dispatch) => {
        dispatch(verifyUserOtpRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/verifyUser`,
                data
            );
            const dataCode = response.data
            console.log(dataCode)
            return dispatch(verifyUserOtpFulfilled(dataCode));
        } catch (e) {
            console.log(e);
            dispatch(verifyUserOtpRejected(e));
        }
    };
};

const createAccount = data => {
    return async (dispatch) => {
        dispatch(createAccountRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/validatePassword`,
                data
            );
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            // save token and user details to local storage
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("mobile", user.savePwd.mobile)
            return dispatch(createAccountFulfilled(response));
        } catch (e) {
            console.log(e);
            dispatch(createAccountRejected(e));
        }
    };
};

const addEmail = data => {
    return async (dispatch) => {
        dispatch(addEmailRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/addEmailAddress`,
                data
            );
            const user = response.data.data;
            // save token and user details to local storage
            // await AsyncStorage.setItem("mobile", user.mobile)
            return dispatch(addEmailFulfilled(user));
        } catch (e) {
            console.log(e);
            dispatch(addEmailRejected(e));
        }
    };
};

const forgotPassword = data => {
    return async (dispatch) => {
        dispatch(forgotPasswordRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/api/user/forgot`,
                data
            );
            console.log(response.data)
            return dispatch(forgotPasswordFulfilled(response.data));
        } catch (e) {
            console.log(e);
            dispatch(forgotPasswordRejected(e));
        }
    };
};



// ACTION CREATORS

const loginWithNumberRequest = () => ({
    type: LOGIN_WITH_PHONE_REQUEST,
});

const loginWithNumberFulfilled = user => ({
    type: LOGIN_WITH_PHONE_FULFILLED,
    payload: user
});

const loginWithNumberRejected = (data) => ({
    type: LOGIN_WITH_PHONE_REJECTED,
    payload: data
});

const verifyUserOtpRequest = () => ({
    type: VERIFY_USER_REQUEST,
});

const verifyUserOtpFulfilled = user => ({
    type: VERIFY_USER_FULFILLED,
    payload: user
});

const verifyUserOtpRejected = (data) => ({
    type: VERIFY_USER_REJECTED,
    payload: data
});

const checkUserRequest = () => ({
    type: CHECK_ACCOUNT_REQUEST,
});

const checkUserFulfilled = user => ({
    type: CHECK_ACCOUNT_FULFILLED,
    payload: user
});

const checkUserRejected = (data) => ({
    type: CHECK_ACCOUNT_REJECTED,
    payload: data
});

const forgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_REQUEST
});

const forgotPasswordFulfilled = data => ({
    type: FORGOT_PASSWORD_FULFILLED,
    payload: data
});

const forgotPasswordRejected = () => ({
    type: FORGOT_PASSWORD_REJECTED
});

const createAccountRequest = () => ({
    type: CREATE_ACCOUNT_REQUEST
});

const createAccountFulfilled = data => ({
    type: CREATE_ACCOUNT_FULFILLED,
    payload: data
});

const createAccountRejected = (data) => ({
    type: CREATE_ACCOUNT_REJECTED,
    payload: data
});

const addEmailRequest = () => ({
    type: ADD_EMAIL_REQUEST
});

const addEmailFulfilled = data => ({
    type: ADD_EMAIL_FULFILLED,
    payload: data
});

const addEmailRejected = (data) => ({
    type: ADD_EMAIL_REJECTED,
    payload: data
});



export {
    loginWithNumber,
    forgotPassword,
    checkForUser,
    verifyUserOtp,
    createAccount,
    addEmail
}
