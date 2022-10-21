

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
    tasks: Task[];
}

export interface TaskGroups {
    task_groups: TaskGroup[];
}



export class LocalStorageManager {
    data!: TaskGroups;

    constructor() {
        let lsdata_str = localStorage.getItem("data") || "{}"
        const lsdata = JSON.parse(lsdata_str);
        if (!Object.keys(lsdata).length) {
            this.init();
            this.save();
        }
        else {
            this.data = lsdata as TaskGroups;
            this.save();
        }
    }

    private save(): void { // this.data -> localstorageにセーブ
        localStorage.setItem("data", JSON.stringify(this.data));
    }

    private sync(): void { // localstorage -> this.dataに同期する
        this.data = JSON.parse(localStorage.getItem("data") || "{}");
    }

    private init(): void{
        this.data = {
            task_groups: [
                {
                    task_group_name: "dummy",
                    color: 0,
                    content: "",
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

    public set(updateData: (prev: TaskGroups) => TaskGroups): void {
        this.sync();
        this.data = updateData(this.data);
        this.save();
    }

    public update(newData: TaskGroups): void {
        this.data  = newData;
        this.save();
    }

    // debug用
    public clear(): void {
        this.init();
    }
}


export const localStorageManager = new LocalStorageManager();



