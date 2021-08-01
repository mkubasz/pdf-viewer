import * as React from 'react';
import { connect } from 'react-redux';
import { IFileState, IProps } from '../../types';
import { Document, Page } from 'react-pdf';
import {history} from "../../helpers";
//import {fileActions} from "../../actions";

class FileView extends React.Component<IProps, IFileState> {
    constructor(props: IProps) {
        super(props);
        const fn = localStorage.getItem("fn");
        this.state = {
          numPages: null, pageNumber: 1,
            file: fn
        };
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    };

    goPrev = () => {
      history.goBack();
    };

    render() {
        const { pageNumber, numPages, file } = this.state;
        const url = "http://localhost:5000/files/" + file;
        return(
            <div>
                <button className="btn btn-info" onClick={this.goPrev}>Back</button>
                <Document
                file={url}
                onLoadSuccess={this.onDocumentLoad}
            >
                {
                    Array.from(
                    new Array(numPages),
                    (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                    />
                    ),
                    )
                }
            </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
        );
    }
}

function mapStateToProps(state: IFileState): IProps {
    const { numPages, file } = state;
    return {
        numPages,
        file
    } as IProps;
}

const connectedFileView = connect(mapStateToProps)(FileView);
export { connectedFileView as FileView }
