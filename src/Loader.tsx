import * as React from 'react';
import './App.css';

interface IProps {
    isLoading: boolean
}

export const Loader = (props: IProps) =>  {
    return (
        <React.Fragment>
            {props.isLoading &&
            <div className="loader">
                <div className="lds-dual-ring" />
            </div>}
        </React.Fragment>
    );
};
