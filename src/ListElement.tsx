import * as moment from 'moment';
import * as React from 'react';
import { IImage } from './Interfaces';

interface IProps {
    standardImageWidth: number;
    image: IImage;
    style: React.CSSProperties;
}

export class ListElement extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const standardMarigin = 50;
        return (
            <div key={this.props.image.id} style={this.props.style}>
                <div 
                    className="list-element" 
                    style={{width: this.props.standardImageWidth + standardMarigin }}
                >
                    <span className="img-text">{this.props.image.title}</span>
                    <img
                        src={this.props.image.url_z}
                        width={this.props.standardImageWidth}
                    />
                    <span className="img-text">{'Author: ' + this.props.image.ownername}</span>
                    <span className="img-text">{'Uploaded: ' + moment(Number(this.props.image.dateupload)*1000).format('Do MMMM YYYY, h:mm a')}</span>
                </div>
            </div> 
        );
    }
}