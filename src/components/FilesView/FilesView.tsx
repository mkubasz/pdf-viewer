import * as React from 'react';
import { connect } from 'react-redux';
import { fileActions } from '../../actions';
import { IState, IProps } from '../../types';
import {Link} from "react-router-dom";

class FilesView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            loaded: false,
            items:[],
            open: false
        };
    }
    componentDidMount() {
        (this.props.dispatch(fileActions.getAll()) as any)
        .then(items=> {
            this.setState({ items: items, loaded: true });
        });
    }

    handleOpenFile(name) {
        this.setState({open: true});
        return this.props.dispatch(fileActions.getByName(name));
    }

    render() {
        if(this.state.loaded == false) {
            return (<em>Loading files...</em>);
        }
        if(!this.state.items) {
            return (<span className="text-danger">Network Error...</span>)
        }
        const { items } = this.state.items;
        return (<div>
            <Link className="btn btn-info" to="/login">Logout</Link>
            <ul className="list-group">
           {items &&
                (items.items.map((item, index) =>
                    <div key={index}>
                        <li className="list-group-item" key={index}>{item}
                        &nbsp;&nbsp;
                        <button className="btn btn-success" disabled={this.state.open} onClick={(e)=>this.handleOpenFile(item)}>Otwórz</button>
                        </li></div>))
            }
            </ul>
        </div>);
    }
}

function mapStateToProps(state: IState): IProps {
    const { items } = state;
    return {
        items
    } as IProps;
}

const connectedFileView = connect(mapStateToProps)(FilesView);
export { connectedFileView as FilesView }
