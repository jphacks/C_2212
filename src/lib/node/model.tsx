/*
	Modelクラスでは、
		・データ
		・ロジック
	を定義する
*/


import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams"


export interface TaskNodeModelOptions extends BaseModelOptions {
	name?: string
	scheduledWorkDays?: number
	progress?: number
}

export class TaskNodeModel extends NodeModel {
	// クラスにプロパティとして定義
	name: string   
	scheduledWorkDays: number       
	progress: number                

	constructor(options: TaskNodeModelOptions = {}) {
		super({
			...options,
			type: 'advanced'
		});

	// 初期化
		this.name = options.name || '';
		this.scheduledWorkDays = options.scheduledWorkDays || 1;
		this.progress = options.progress || 0;

		this.addPort(
			new DefaultPortModel({
				in: true,
				name: 'in'
			})
		);
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out'
			})
		);
	}

	addProgress(percent: number) {
		this.progress += percent;
		if (this.progress > 100) this.progress = 100;
	}

	downProgress(percent: number) {
		this.progress -= percent
		if (this.progress < 0) this.progress = 0;
	}

	serialize() {
		return {
			...super.serialize(),
	// JSONへのシリアライズ時の挙動
			name: this.name,
			scheduledWorkDays: this.scheduledWorkDays,
			progress: this.progress
		};
	}

	deserialize(event: any): void {
		super.deserialize(event);
	// JSONからの復元時の挙動
		this.name = event.data.name || '';
		this.scheduledWorkDays = event.data.scheduledWorkDays || 1;
		this.progress = event.data.progress || 0;
	}
}
