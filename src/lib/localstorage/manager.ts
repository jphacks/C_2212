

export interface Task {
    task_name: string;
    color: number;
    scheduled_date: string;
    deadline: string;
}


export interface TaskGroup {
    task_group_name: string;
    color: number,
    content: string,
    newChart: Boolean,
    unvisible: Boolean,
    tasks: Task[];
}

export interface TaskGroups {
    task_groups: TaskGroup[];
}



export class LocalStorageManager {
    data!: TaskGroups;

    constructor() {
        const lsdata = JSON.parse(localStorage.getItem("data") || "{}");
        if (!Object.keys(lsdata).length) {
            this.init();
            this.save();
        } 
    }

    private save(): void { // this.data -> localstorageにセーブ
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    private sync(): void { // localstorage -> this.dataに同期する
        this.data = JSON.parse(localStorage.getItem("data") || "{}");
    }

    private init(): void{ // ダミーデータを入れておく
        this.data = {
            task_groups: [
                {
                    task_group_name: "dummy",
                    color: 0,
                    content: "",
                    newChart: false,
                    unvisible: false,
                    tasks: [
                        {
                            task_name: "",
                            color: 0,
                            scheduled_date: "10/20",
                            deadline: "10/30"
                        },
                    ]
                }
            ]
        };
    }

    
    public getData(): TaskGroups {
        this.sync();
        return this.data;
    }

    public set(updateData: (prev: TaskGroups) => TaskGroups) {
        this.sync();
        this.data = updateData(this.data);
        this.save();
    }

    // debug用
    public clear(): void {
        this.init();
    }


}


