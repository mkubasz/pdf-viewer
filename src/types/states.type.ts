export interface IState {
    alert?: any;
    username?: string;
    password?: string;
    submitted?: boolean;
    authentication?: any;
    loaded?: boolean;
    items?: any;
    open?: boolean;
}

export interface IFileState {
    file?: any,
    numPages?: any,
    pageNumber?: number
}