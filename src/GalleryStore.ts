import { action, computed, observable } from 'mobx';
import { IImage } from './Interfaces';
import { RestHelper } from './RestHelper';

export class GalleryStore {
    @observable
    public imageWidth: number = 480;
    @observable
    public isLoading: boolean = false;
    @observable
    public total: number = 0;
    @observable 
    public images: IImage[] = [];
    @observable
    public error: Error | null = null;
    @observable
    private tag: string = '';

    private page: number = 1;
    

    @computed 
    get totalImagesLoaded() {
        return this.images.length;
    }   

    @action
    public async loadMorePhotos() {
        this.isLoading = true;
        try {
            const data = await RestHelper.getImages(RestHelper.standardHeaders(this.page++, this.tag));
            this.images = [...this.images, ...(data.photos.photo as IImage[]).filter(p => p.url_z !== undefined)];
            this.total = Number(data.photos.total);
        } catch (error) {
            this.error = error;
        }
        this.isLoading = false;
    }

    @action
    public changeImageWidth = (changeInWidth: number) => {
        const minWidth = 100;
        const maxWidth = 1000;
        if ( this.imageWidth + changeInWidth > minWidth && this.imageWidth + changeInWidth < maxWidth ) {
            this.imageWidth += changeInWidth;
            this.clearPhotosAndReload();   
        }
    }

    @action
    public prepareChangingTag(tag: string) {
        if (this.isLoading === false) {
            this.tag = tag;
            setTimeout(() => this.changeTag(tag), 1000);
        }
    }

    public changeTag = (tag: string) => {
        if (tag === this.tag) {
            this.clearPhotosAndReload();
        }
    }



    public rowHeight = (index: number) => {
        if (this.images[index]) {
            const image =  this.images[index];
            const width = Number(image.width_z);
            const height = Number(image.height_z);
            return Math.ceil(height*(this.imageWidth/width)) + 200;
        }
        return 0;
    }

    public isImageLoaded = (index: number) => !!this.images[index];

    @action
    private clearPhotosAndReload() {
        this.page = 1;
        this.images = [];
        this.loadMorePhotos();
    }
}