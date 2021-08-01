import { DispatchProp } from "react-redux";
import { AnyAction } from "redux";

export interface IProps extends DispatchProp<AnyAction> {
    alert?: any;
    loggingIn?: boolean;
    loaded?: boolean;
    items?: any;
    file?: string;
}