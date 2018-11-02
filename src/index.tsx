import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ErrorStore } from './ErrorStore';
import { GalleryStore } from './GalleryStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
dotenv.load();

const galleryStore = new GalleryStore;
const errorStore = new ErrorStore;
ReactDOM.render(
    <App 
      galleryStore={galleryStore}
      errorStore={errorStore}
    />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
