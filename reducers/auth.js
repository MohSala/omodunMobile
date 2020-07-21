import {
    LOGIN_WITH_PHONE_ACTION_TYPES,
    // FORGOT_PASSWORD_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES,
    CHECK_ACCOUNT_ACTION_TYPES,
    VERIFY_USER_ACTION_TYPES,
    ADD_EMAIL_ACTION_TYPES,
    GET_USER_WALLET_ACTION_TYPES,
    CREDIT_TRANSACTION_ACTION_TYPES,
    GET_TRANSACTION_ACTION_TYPES,
    GET_FEW_TRANSACTION_ACTION_TYPES,
    REGISTER_A_TASK_ACTION_TYPES
} from '../actions/actionTypes'


const {
    GET_FEW_TRANSACTION_FULFILLED,
    GET_FEW_TRANSACTION_REJECTED,
    GET_FEW_TRANSACTION_REQUEST
} = GET_FEW_TRANSACTION_ACTION_TYPES;

const {
    REGISTER_A_TASK_FULFILLED,
    REGISTER_A_TASK_REJECTED,
    REGISTER_A_TASK_REQUEST
} = REGISTER_A_TASK_ACTION_TYPES
// const {
//     FORGOT_PASSWORD_REQUEST,
//     FORGOT_PASSWORD_FULFILLED,
//     FORGOT_PASSWORD_REJECTED
// } = FORGOT_PASSWORD_ACTION_TYPES;

const {
    LOGIN_WITH_PHONE_FULFILLED,
    LOGIN_WITH_PHONE_REJECTED,
    LOGIN_WITH_PHONE_REQUEST
} = LOGIN_WITH_PHONE_ACTION_TYPES

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
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_FULFILLED,
    CREATE_ACCOUNT_REJECTED
} = CREATE_ACCOUNT_ACTION_TYPES;

const {
    CHECK_ACCOUNT_FULFILLED,
    CHECK_ACCOUNT_REJECTED,
    CHECK_ACCOUNT_REQUEST
} = CHECK_ACCOUNT_ACTION_TYPES;

const {
    VERIFY_USER_FULFILLED,
    VERIFY_USER_REJECTED,
    VERIFY_USER_REQUEST
} = VERIFY_USER_ACTION_TYPES

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

const initialState = {
    isAuthenticated: false,
    error: false,
    errorMsg: null,
    resetSent: false,
    resetDone: false,
    loading: false,
    loadingInvite: false,
    user: null,
    allUsers: null,
    usersFetched: false,
    message: '',
    created: false,
    task: null,
    transactions: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_WITH_PHONE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case LOGIN_WITH_PHONE_FULFILLED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_WITH_PHONE_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: true,
                errorMsg: action.payload.response
            }

        case CREDIT_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case CREDIT_TRANSACTION_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case CREDIT_TRANSACTION_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        case VERIFY_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case VERIFY_USER_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case VERIFY_USER_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: true,
                errorMsg: action.payload.response
            }

        case CHECK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case CHECK_ACCOUNT_FULFILLED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                data: action.payload
            }

        case CHECK_ACCOUNT_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: true,
                errorMsg: action.payload.response
            }

        case CREATE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ACCOUNT_FULFILLED:
            return {
                ...state,
                loading: false,
                created: true,
                data: action.payload
            }

        case CREATE_ACCOUNT_REJECTED:
            return {
                ...state,
                loading: false,
                created: false,
                error: true,
                errorMsg: action.payload.response
            }

        case ADD_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case ADD_EMAIL_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case ADD_EMAIL_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        case GET_USER_WALLET_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case GET_USER_WALLET_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case GET_USER_WALLET_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        case GET_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case GET_TRANSACTION_FULFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case GET_TRANSACTION_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        case GET_FEW_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case GET_FEW_TRANSACTION_FULFILLED:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }

        case GET_FEW_TRANSACTION_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        case REGISTER_A_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case REGISTER_A_TASK_FULFILLED:
            return {
                ...state,
                loading: false,
                task: action.payload
            }

        case REGISTER_A_TASK_REJECTED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.response
            }

        default:
            return state;
    }
};

export default authReducer;