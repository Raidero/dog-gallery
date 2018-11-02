import { observable } from 'mobx';

export class ErrorStore {
    @observable
    public error: boolean = false;

    set Error(error: boolean) {
        this.error = error;
    }
}