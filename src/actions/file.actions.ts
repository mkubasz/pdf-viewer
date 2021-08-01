import { fileConstants } from '../constants';
import { fileService } from '../services';
import { history} from "../helpers";

export const fileActions = {
    getByName,
    getAll
};

function getByName(name: string): any {
    return dispatch => {
        dispatch(request());
        if(!name){
            dispatch(failure("No file name."));
        }
        localStorage.setItem('fn', name);
        return fileService.getByName(name)
            .then(
                file => {history.push("/pdfview");dispatch(success(name));},
                error => dispatch(failure(error))
            );
    };
 
    function request() { return { type: fileConstants.GETBYNAME_REQUEST } }
    function success(file: any) { return { type: fileConstants.GETBYNAME_SUCCESS, file } }
    function failure(error: any) { return { type: fileConstants.GETBYNAME_FAILURE, error } }
}

function getAll(): any {
    return dispatch => {
        dispatch(request());
 
        return fileService.getAll()
            .then(
                items => dispatch(success(items)),
                error => { 
                    dispatch(failure(error));
                }
            );
    };
 
    function request() { return { type: fileConstants.GETALL_REQUEST } }
    function success(items: any) { return { type: fileConstants.GETALL_SUCCESS, items } }
    function failure(error: any) { return { type: fileConstants.GETALL_FAILURE, error } }
}