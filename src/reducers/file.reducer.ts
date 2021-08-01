import { fileConstants } from '../constants';
import { IState } from '../types';

export function files(state: IState = {}, action) {
    switch (action.types) {
        case fileConstants.GETALL_REQUEST:
            return {
                loaded: false
            };
        case fileConstants.GETALL_SUCCESS:
            return {   
                loaded: true,      
                items: action.items
            };
        case fileConstants.GETALL_FAILURE:
            return {
                loaded: true,
                items: action.items
            };
        case fileConstants.GETBYNAME_REQUEST:
            return {};
        case fileConstants.GETBYNAME_SUCCESS:
            return {
                file: action.file
            };
        case fileConstants.GETBYNAME_FAILURE:
            return {};
        default:
            return state;
    }
}