
export type LocalStorageDataType = any



export class LocalStorageManager {
    data: LocalStorageDataType;

    constructor() {
        this.data = JSON.parse(localStorage.getItem("data") || "{}");
    }

    private save(): void { // this.data -> localstorageにセーブ
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    private sync(): void { // localstorage -> this.dataに同期する
        this.data = JSON.parse(localStorage.getItem("data") || "{}");
    }

    
    public getData(): LocalStorageDataType {
        this.sync();
        return this.data;
    }

    public set(updateData: (prev: LocalStorageDataType) => LocalStorageDataType) {
        this.sync();
        this.data = updateData(this.data);
        this.save();
    }

    // debug用
    public clear() {
        this.data = {};
        this.save();
    }


}


