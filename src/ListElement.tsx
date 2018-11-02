import { observer } from 'mobx-react';
import * as moment from 'moment';
import * as React from 'react';
import { GalleryStore } from './GalleryStore';

interface IProps {
    galleryStore: GalleryStore;
    index: number;
    style: React.CSSProperties;
}

@observer
export class ListElement extends React.Component<IProps> {
    public render() {
        const standardMarigin = 50;
        const image = this.props.galleryStore.images[this.props.index];
        return (
            <div key={image.id} style={this.props.style}>
                <div 
                    className="list-element" 
                    style={{width: this.props.galleryStore.imageWidth + standardMarigin }}
                >
                    <span className="img-text">{image.title}</span>
                    <img
                        src={image.url_z}
                        width={this.props.galleryStore.imageWidth}
                    />
                    <span className="img-text">{'Author: ' + image.ownername}</span>
                    <span className="img-text">{'Uploaded: ' + moment(Number(image.dateupload)*1000).format('Do MMMM YYYY, h:mm a')}</span>
                </div>
            </div> 
        );
    }
}