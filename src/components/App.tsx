import * as React from 'react';
import { Router, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { alertActions } from '../actions';
import { history } from '../helpers';
import { LoginPage } from './LoginPage/LoginPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { FilesView } from './FilesView/FilesView';
import { FileView } from './FileView/FileView';
import { IProps, IState } from '../types';


class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const { dispatch } = props;
        history.listen((location, action) => {
            dispatch(alertActions.clear());
        });
    }
    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>
                            {alert.message}
                        </div>
                    }
                    <Router history={history}>
                        <div>
                            <PrivateRoute exact path="/" component={FilesView} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/pdfview" component={FileView} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: IState): IProps {
    const { alert }  = state;
    return { alert } as IProps;
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };