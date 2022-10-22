/*
	Modelクラスでは、
		・データ
		・ロジック
	を定義する
*/


import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { NodeModel } from "@projectstorm/react-diagrams"
import { AdvancedPortModel } from "../port/model";

import { localStorageManager } from "../localstorage/manager";


export interface TaskNodeModelOptions extends BaseModelOptions {
	task_group_name: string;
	name?: string
	scheduled_date?: string
	deadline?: string
	from?: string
	to?: string
	x?: number
	y?: number
}

export class TaskNodeModel extends NodeModel {
	// クラスにプロパティとして定義
	task_group_name: string;
	name: string   
	scheduled_date: string
	deadline: string
	from: string
	to: string
	x: number
	y: number

	constructor(options: TaskNodeModelOptions) {
		super({
			...options,
			type: 'advanced'
		});

	// 初期化
		// this.deserialize(options)
		this.task_group_name = options.task_group_name;
		this.name = options.name || '未設定';
		this.scheduled_date = options.scheduled_date || "未設定";
		this.deadline = options.deadline || "";
		this.from = options.from || "";
		this.to = options.to || "";
		this.x = options.x || 100;
		this.y = options.y || 100;

		this.setPosition(this.x, this.y);

		this.addPort(
			new AdvancedPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new AdvancedPortModel({
				in: false,
				name: 'out'
			})
		);
		this.saveToLocalStorage();
	}


	saveToLocalStorage () {
		
		let prev = localStorageManager.getData();
		// console.log(prev);
		
		const matched_task_group_index = prev.task_groups.findIndex((task_group) => {
			// console.log(task_group.task_group_name);
			// console.log(this.task_group_name);
			return task_group.task_group_name === this.task_group_name
		});
		// console.log(matched_task_group_index);
		

		if (matched_task_group_index !== -1) {
			// prev.task_groups[matched_task_group_index].tasks.push(this.serialize());
			// localStorageManager.update(prev);
			// return;
			const matched_task_index = prev.task_groups[matched_task_group_index].tasks.findIndex((task: any) => task.name === this.name);
			if (matched_task_index !== -1) {
				prev.task_groups[matched_task_group_index].tasks[matched_task_index] = this.serialize();
				localStorageManager.update(prev);
			} else {
				prev.task_groups[matched_task_group_index].tasks.push(this.serialize());
				localStorageManager.update(prev);
			}
		} else {
			console.error("this is not to be called ababab");
		}
		console.log(this.serialize());
	}

	deleteFromLocalStorage() { // 消すだけ -> 更新したいならsaveToLocalStorageを呼ぶべし
		let prev = localStorageManager.getData();
		const matched_task_group_index = prev.task_groups.findIndex((task_group) => task_group.task_group_name === this.task_group_name);

		if (matched_task_group_index !== -1) {
			prev.task_groups[matched_task_group_index].tasks = prev.task_groups[matched_task_group_index].tasks.filter((task: any) => task.name !== this.name);
			localStorageManager.update(prev);
		} else {
			console.error("this is not to be called");
		}
	}

	remove() {
		this.deleteFromLocalStorage();
		console.log(localStorageManager.getData());
		super.remove();
	}

	serialize() {
		return {
			...super.serialize(),
	// JSONへのシリアライズ時の挙動
			task_group_name: this.task_group_name,
			name: this.name,
			scheduled_date: this.scheduled_date,
			deadline: this.deadline,
			from: this.from,
			to: this.to,
		};
	}
	
	getTo() {
		return this.to
	}

	deserialize(event: any): void {
		super.deserialize(event);
	// JSONからの復元時の挙動
		this.task_group_name = event.data.task_group_name || ""
		this.name = event.data.name || '未設定';
		this.scheduled_date = event.data.scheduled_date;
		this.deadline = event.data.deadline;
		this.from = event.data.from;
		this.to = event.data.to;
	}
}
