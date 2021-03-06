import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {apiRequest} from '../API'
import {
    STATUS_IDLE, 
    STATUS_LOADING, 
    STATUS_SUCCEEDED, 
    STATUS_FAILED, 
    BASE_URL, 
    METHOD_POST, 
    AUTHENTICATION_STATE_KEY,
    AUTHENTICATION_TYPE_LOGIN,
} from '../Constants';

export const loginSignupRequest = createAsyncThunk(
    'authentication/loginSignup', 
    /*
    params = {
        userType: USER_TYPE_STUDENT | USER_TYPE_PROFESSOR | USER_TYPE_EMPLOYEE, 
        authenticationType: AUTHENTICATION_TYPE_LOGIN | AUTHENTICATION_TYPE_SIGNUP,
        body: {}
    }
    */
    async (params) => {
        const headers = {
            'Content-Type': 'application/json', 
        }
        // let userType = (params.userType === USER_TYPE_ADMIN) ? API_DEPARTMENT : params.userType;
        const data = await apiRequest(BASE_URL+`/api/v1/user/${params.authenticationType}`, METHOD_POST, headers, JSON.stringify(params.body));
        console.log(`data From login or signup =>  ${data}`);
        return data;
    }
);



/*
state: {
    userType: USER_TYPE_STUDENT | USER_TYPE_PROFESSOR | USER_TYPE_EMPLOYEE
    userInfo: {}, 
    authenticationType: AUTHENTICATION_TYPE_LOGIN | AUTHENTICATION_TYPE_SIGNUP
    status: STATUS_IDLE, 
    error: // string | null
}
*/

const initialState = {
    userType: '',
    userInfo: {},
    authenticationType: '', 
    status: STATUS_IDLE, 
    error: null // string | null
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        loadAuthenticationStateCookie: state => {
            //console.log("Before: ", state.userType);
            let cookieState = JSON.parse(localStorage.getItem(AUTHENTICATION_STATE_KEY));
            state.userType = cookieState.userType;
            state.userInfo = cookieState.userInfo;
            state.authenticationType = cookieState.authenticationType;
            state.status = cookieState.status;
            state.error = cookieState.error;
            //console.log("After: ", state.userType);
        }, 
        logout: state => {
            // console.log("called");
            localStorage.removeItem(AUTHENTICATION_STATE_KEY);
            //console.log("After removing: ", localStorage.removeItem(AUTHENTICATION_STATE_KEY));
            state.userType = initialState.userType;
            state.userInfo = initialState.userInfo;
            state.authenticationType = initialState.authenticationType;
            state.status = initialState.status;
            state.error = initialState.error;
        }
    }, 
    extraReducers: {
        [loginSignupRequest.fulfilled]: (state, action) => {
            const params = action.meta.arg;
            const receivedData = action.payload;
            
            // const newState = {
            //     userType: 'learner',
            //     userInfo: 'token',
            //     authenticationType: 'login',
            //     status: 'succeeded'
            // }

            state.userType = params.userType;
            state.userInfo = receivedData;
            state.authenticationType = params.authenticationType;
            state.status = STATUS_SUCCEEDED;
            if (params.authenticationType === AUTHENTICATION_TYPE_LOGIN)
                localStorage.setItem(AUTHENTICATION_STATE_KEY, JSON.stringify(state));
            
        }, 
        [loginSignupRequest.pending]: (state) => {
            state.status = STATUS_LOADING;
        }, 
        [loginSignupRequest.rejected]: (state, action) => {
            state.status = STATUS_FAILED;
            state.error = action.payload;
        }
    }
});

export const selectAuthentication = state => state.authentication;
export const {loadAuthenticationStateCookie, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
