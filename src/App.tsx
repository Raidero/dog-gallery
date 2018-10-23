import * as React from 'react';
import 'react-virtualized/styles.css';
import './App.css';
import { ErrorPage } from './ErrorPage';
import { Gallery } from './Gallery';
import { IImage } from './Interfaces';
import { Loader } from './Loader';

interface IState {
  error: boolean;
  isLoading: boolean;
  data: IImage[];
  total: number;
}

class App extends React.Component<any, IState> {
  private page: number;

  constructor(props: any) {
    super(props);
    this.page = 1;

    this.state = {
      data: [],
      error: false,
      isLoading: false,
      total: 0
    }
  }

  public componentDidMount() {
    this.loadMorePhotos();
  }

  public render() {
    return (
      <div className="app">
        <Gallery
          data={this.state.data}
          total={this.state.total}
          loadMorePhotos={this.loadMorePhotos}
        />
        <Loader
          isLoading={this.state.isLoading}
        />
        <ErrorPage
          error={this.state.error}
        />
      </div>
    );
  }

  private loadMorePhotos = async () => {
    this.setState({ isLoading: true });
    this.getData(this.standardHeaders(this.page++)).then(data =>
      this.setState({
        data: [...this.state.data, ...(data.photos.photo as IImage[]).filter(p => p.url_z !== undefined)],
        isLoading: false,
        total: Number(data.photos.total)
      }));
  }

  private getData = async (headers: object) => {
    let url = process.env.REACT_APP_FLICKR_API_URL || '';

    // tslint:disable-next-line:forin
    for (const headerName in headers) {
      url += headerName + '=' + headers[headerName] + '&';
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        throw new Error('Data fetch failed due to server error, bad response');
      } else { // production
        this.setState({ error: true });
      }
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
    }
    return [];
  }

  private standardHeaders = (pageNumber: number) => ({
    api_key: '0ca1eb4259874ebb14050c0271584392',
    extras: 'date_upload,owner_name,url_z',
    format: 'json',
    method: 'flickr.photos.search',
    nojsoncallback: 1,
    page: pageNumber,
    text: 'dogs'
  });
}

export default App;
