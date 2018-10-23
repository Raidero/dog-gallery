import * as React from 'react';
import './App.css';

interface IProps {
    error: boolean
}

export const ErrorPage = (props: IProps) => {
    return (
        <React.Fragment>
            {props.error &&
            <div className="error-page">
            <span>
              <p>Woops. Something crashed.</p>
              <p>Try reload the page or contact the administrator at g.tomaszczyk1124@gmail.com</p>
            </span>
            <i className="material-icons">rowing</i>
          </div>}
        </React.Fragment>
    );
};
