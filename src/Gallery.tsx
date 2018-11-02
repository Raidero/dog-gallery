import { observer } from 'mobx-react'
import * as React from 'react';
import { AutoSizer, Index, InfiniteLoader, List, ListRowProps } from 'react-virtualized';
import { GalleryStore } from './GalleryStore';
import { ListElement } from './ListElement';
import { Loader } from './Loader';

interface IProps {
    store: GalleryStore;
}

@observer
export class Gallery extends React.Component<IProps> {
    public componentDidMount() {
        this.props.store.loadMorePhotos();
    }

    public render() {
        // tslint:disable-next-line:no-console
        console.log('xdd')
        const store = this.props.store;
        if (store.error) {
            throw store.error;
        }
        return (
            <React.Fragment>
                <div className="header">
                    <input type="button" value="+" onClick={this.props.store.increaseImageWidth}/>
                    <input type="text" onChange={this.changeTag}/>
                </div>
                <div className="gallery">
                    <InfiniteLoader
                        isRowLoaded={this.isRowLoaded}
                        loadMoreRows={this.props.store.loadMorePhotos}
                        rowCount={store.total}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <AutoSizer>
                                {({ height, width }) => (
                                    <List
                                        height={height}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        rowCount={store.totalImagesLoaded}
                                        rowHeight={this.rowHeight}
                                        rowRenderer={this.rowRenderer}
                                        width={width}
                                    />
                                )}
                            </AutoSizer>
                        )}
                    </InfiniteLoader>
                    <Loader
                        isLoading={store.isLoading}
                    />
                </div>
            </React.Fragment>
        );
    }

    private changeTag = (event: React.ChangeEvent<HTMLInputElement>) => this.props.store.changeTag(event.currentTarget.value);

    private rowHeight = (params: Index) => this.props.store.rowHeight(params.index);

    private isRowLoaded = (params: Index) => this.props.store.isImageLoaded(params.index);

    private rowRenderer = (params: ListRowProps) => (
        <ListElement
            key={params.key}
            index={params.index}
            galleryStore={this.props.store}
            style={params.style}
        />
    );
};
