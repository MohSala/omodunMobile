import axios from 'axios';
import { AsyncStorage } from 'react-native';

import {
    LOGIN_WITH_PHONE_ACTION_TYPES,
    FORGOT_PASSWORD_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES,
    CHECK_ACCOUNT_ACTION_TYPES,
    VERIFY_USER_ACTION_TYPES,
    ADD_EMAIL_ACTION_TYPES,
    GET_USER_WALLET_ACTION_TYPES,
    CREDIT_TRANSACTION_ACTION_TYPES,
    GET_TRANSACTION_ACTION_TYPES,
    GET_FEW_TRANSACTION_ACTION_TYPES,
    REGISTER_A_TASK_ACTION_TYPES,
    ADD_ADDRESS_ACTION_TYPES,
    GET_ADDRESS_ACTION_TYPES
} from "./actionTypes";


const {
    LOGIN_WITH_PHONE_FULFILLED,
    LOGIN_WITH_PHONE_REJECTED,
    LOGIN_WITH_PHONE_REQUEST
} = LOGIN_WITH_PHONE_ACTION_TYPES;

const {
    ADD_ADDRESS_FULFILLED,
    ADD_ADDRESS_REJECTED,
    ADD_ADDRESS_REQUEST
} = ADD_ADDRESS_ACTION_TYPES;

const {
    GET_ADDRESS_FULFILLED,
    GET_ADDRESS_REJECTED,
    GET_ADDRESS_REQUEST
} = GET_ADDRESS_ACTION_TYPES

const {
    REGISTER_A_TASK_FULFILLED,
    REGISTER_A_TASK_REJECTED,
    REGISTER_A_TASK_REQUEST
} = REGISTER_A_TASK_ACTION_TYPES

const {
    GET_FEW_TRANSACTION_FULFILLED,
    GET_FEW_TRANSACTION_REJECTED,
    GET_FEW_TRANSACTION_REQUEST
} = GET_FEW_TRANSACTION_ACTION_TYPES;

const {
    GET_TRANSACTION_FULFILLED,
    GET_TRANSACTION_REJECTED,
    GET_TRANSACTION_REQUEST
} = GET_TRANSACTION_ACTION_TYPES

const {
    CREDIT_TRANSACTION_FULFILLED,
    CREDIT_TRANSACTION_REJECTED,
    CREDIT_TRANSACTION_REQUEST
} = CREDIT_TRANSACTION_ACTION_TYPES

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

const {
    GET_USER_WALLET_FULFILLED,
    GET_USER_WALLET_REJECTED,
    GET_USER_WALLET_REQUEST
} = GET_USER_WALLET_ACTION_TYPES

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
            return dispatch(checkUserFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(checkUserRejected(e));
        }
    }
}

const creditTransaction = data => {
    return async (dispatch) => {
        dispatch(creditTransactionRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/creditTransaction`,
                data
            )
            const dataCode = response.data
            return dispatch(creditTransactionFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(creditTransactionRejected(e));
        }
    }
}

const registerTask = data => {
    return async (dispatch) => {
        dispatch(registerTaskRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/registerTask`,
                data
            )
            const dataCode = response.data
            return dispatch(registerTaskFulfilled(dataCode));
        } catch (e) {
            console.log(e);
            dispatch(registerTaskRejected(e));
        }
    }
}

const getWalletBalance = data => {
    return async (dispatch) => {
        dispatch(getWalletRequest());
        try {
            const response = await axios.get(
                `${BASE_URL}/wallet?mobile=${data}`
            )
            const dataCode = response.data
            const walletId = response.data.data._id;
            await AsyncStorage.setItem("walletId", walletId);
            return dispatch(getWalletFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(getWalletRejected(e));
        }
    }
}

const getMyTransaction = data => {
    return async (dispatch) => {
        dispatch(getMyTransactionRequest());
        try {
            const response = await axios.get(
                `${BASE_URL}/transactions?walletId=${data}`
            )
            const dataCode = response.data
            return dispatch(getMyTransactionFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(getMyTransactionRejected(e));
        }
    }
}

const getFewTransaction = data => {
    return async (dispatch) => {
        dispatch(getFewTransactionRequest());
        try {
            const response = await axios.get(
                `${BASE_URL}/latestActivity?walletId=${data}`
            )
            const dataCode = response.data
            return dispatch(getFewTransactionFulfilled(dataCode));
        } catch (error) {
            console.log(e);
            dispatch(getFewTransactionRejected(e));
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
            const email = user.user.email
            // save token and user details to local storage
            await AsyncStorage.setItem("email", email)
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
                `${BASE_URL}/createMerchant`,
                data
            );
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            // save token and user details to local storage
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("mobile", user.user.mobile)
            await AsyncStorage.setItem("email", user.user.email)
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
            const email = user.email
            // save token and user details to local storage
            await AsyncStorage.setItem("email", email)
            return dispatch(addEmailFulfilled(user));
        } catch (e) {
            console.log(e);
            dispatch(addEmailRejected(e));
        }
    };
};

const addDeliveryAddress = data => {
    return async (dispatch) => {
        dispatch(addAddressRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/deliveryAddress`,
                data
            );
            const { message } = response.data;
            return dispatch(addAddressFulfilled(message));
        } catch (error) {
            console.log(error);
            dispatch(addAddressRejected(error));
        }
    }
}

const getDeliveryAddress = data => {
    return async (dispatch) => {
        dispatch(getAddressRequest());
        try {
            const response = await axios.get(
                `${BASE_URL}/deliveryAddress?mobile=${data}`,

            );
            const { deliveryAddress } = response.data.data;
            return dispatch(getAddressFulfilled(deliveryAddress));
        } catch (error) {
            console.log(error);
            dispatch(getAddressRejected(error));
        }
    }
}

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

const getWalletRequest = () => ({
    type: GET_USER_WALLET_REQUEST,
});

const getWalletFulfilled = data => ({
    type: GET_USER_WALLET_FULFILLED,
    payload: data
});

const getWalletRejected = (data) => ({
    type: GET_USER_WALLET_REJECTED,
    payload: data
});

const getMyTransactionRequest = () => ({
    type: GET_TRANSACTION_REQUEST,
});

const getMyTransactionFulfilled = data => ({
    type: GET_TRANSACTION_FULFILLED,
    payload: data
});

const getMyTransactionRejected = (data) => ({
    type: GET_TRANSACTION_REJECTED,
    payload: data
});

const getFewTransactionRequest = () => ({
    type: GET_FEW_TRANSACTION_REQUEST,
});

const getFewTransactionFulfilled = data => ({
    type: GET_FEW_TRANSACTION_FULFILLED,
    payload: data
});

const getFewTransactionRejected = (data) => ({
    type: GET_FEW_TRANSACTION_REJECTED,
    payload: data
});

const registerTaskRequest = () => ({
    type: REGISTER_A_TASK_REQUEST,
});

const registerTaskFulfilled = data => ({
    type: REGISTER_A_TASK_FULFILLED,
    payload: data
});

const registerTaskRejected = (data) => ({
    type: REGISTER_A_TASK_REJECTED,
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

const creditTransactionRequest = () => ({
    type: CREDIT_TRANSACTION_REQUEST,
});

const creditTransactionFulfilled = user => ({
    type: CREDIT_TRANSACTION_FULFILLED,
    payload: user
});

const creditTransactionRejected = (data) => ({
    type: CREDIT_TRANSACTION_REJECTED,
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

const addAddressRequest = () => ({
    type: ADD_ADDRESS_REQUEST
});

const addAddressFulfilled = data => ({
    type: ADD_ADDRESS_FULFILLED,
    payload: data
});

const addAddressRejected = (data) => ({
    type: ADD_ADDRESS_REJECTED,
    payload: data
});

const getAddressRequest = () => ({
    type: GET_ADDRESS_REQUEST
});

const getAddressFulfilled = data => ({
    type: GET_ADDRESS_FULFILLED,
    payload: data
});

const getAddressRejected = (data) => ({
    type: GET_ADDRESS_REJECTED,
    payload: data
});



export {
    loginWithNumber,
    forgotPassword,
    checkForUser,
    verifyUserOtp,
    createAccount,
    addEmail,
    getWalletBalance,
    creditTransaction,
    getMyTransaction,
    getFewTransaction,
    registerTask,
    addDeliveryAddress,
    getDeliveryAddress
}
