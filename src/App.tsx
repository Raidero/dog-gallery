import { observer } from 'mobx-react';
import * as React from 'react';
import 'react-virtualized/styles.css';
import './App.css';
import { ErrorPage } from './ErrorPage';
import { ErrorStore } from './ErrorStore';
import { Gallery } from './Gallery';
import { GalleryStore } from './GalleryStore';

interface IProps {
  galleryStore: GalleryStore;
  errorStore: ErrorStore;
}

@observer
export default class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="app">
        <ErrorPage
          store={this.props.errorStore}
        >
          <Gallery
            store={this.props.galleryStore}
          />
        </ErrorPage>
      </div>
    );
  }
}
