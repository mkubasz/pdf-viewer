import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';

export const userActions = {
    login,
    logout
};

function login(username: string, password: string) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                } 
            );
    };

    function request(user: any) {
        return { type: userConstants.LOGIN_REQUEST, user }
    }
    function success(user: any) {
        return { type: userConstants.LOGIN_SUCCESS, user } 
    }
    function failure(error: any) {
        return { type: userConstants.LOGIN_FAILURE, error } 
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}