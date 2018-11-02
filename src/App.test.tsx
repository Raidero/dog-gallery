import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ErrorStore } from './ErrorStore';
import { GalleryStore } from './GalleryStore';
jest.mock('./GalleryStore');
jest.mock('./ErrorStore');

it('renders without crashing', () => {
  const div = document.createElement('div');
  const galleryStore = new GalleryStore;
  const errorStore = new ErrorStore;
  ReactDOM.render(<App 
    galleryStore={galleryStore}
    errorStore={errorStore}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
