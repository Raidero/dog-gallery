import * as React from 'react';
import { AutoSizer, Index, IndexRange, InfiniteLoader, List, ListRowProps } from 'react-virtualized';
import { IImage } from './Interfaces';
import { ListElement } from './ListElement';

interface IProps {
    data: IImage[];
    total: number;
    loadMorePhotos: () => Promise<void>;
}

export class Gallery extends React.Component<IProps> {
    private standardImageWidth: number;

    constructor(props: IProps) {
        super(props);
        this.standardImageWidth = 480;
    }

    public render() {
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={this.props.total}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={this.props.data.length}
                                rowHeight={this.rowHeight}
                                rowRenderer={this.rowRenderer}
                                width={width}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        );
    }

    private rowHeight = (params: Index) => {
        const width = Number(this.props.data[params.index].width_z);
        const height = Number(this.props.data[params.index].height_z);
        return Math.ceil(height*(this.standardImageWidth/width)) + 200;
    }

    private rowRenderer = (params: ListRowProps) => (
        <ListElement
            key={this.props.data[params.index].id}
            image={this.props.data[params.index]}
            standardImageWidth={this.standardImageWidth}
            style={params.style}
        />
    );

    private isRowLoaded = (params: Index) => {
        return !!this.props.data[params.index];
    }

    private loadMoreRows = async (params: IndexRange) => {
        this.props.loadMorePhotos();
    }
};
