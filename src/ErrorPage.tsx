import { observer } from 'mobx-react';
import * as React from 'react';
import './App.css';
import { ErrorStore } from './ErrorStore';

interface IProps {
    store: ErrorStore;
}

@observer
export class ErrorPage extends React.Component<IProps> {
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.props.store.Error = true;
    }

    public render() {
        if (this.props.store.error) {
            return (
                <div className="error-page">
                    <span>
                        <p>Woops. Something crashed.</p>
                        <p>Try reload the page or contact the administrator at g.tomaszczyk1124@gmail.com</p>
                    </span>
                    <i className="material-icons">rowing</i>
                </div>
            );
        }
        return this.props.children;
    }
}
