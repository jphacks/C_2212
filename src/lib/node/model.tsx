/*
	Modelクラスでは、
		・データ
		・ロジック
	を定義する
*/


import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { NodeModel } from "@projectstorm/react-diagrams"
import { AdvancedPortModel } from "../port/model";


export interface TaskNodeModelOptions extends BaseModelOptions {
	name?: string
	scheduled_date?: string
	deadline?: string
	from?: string
	to?: string
}

export class TaskNodeModel extends NodeModel {
	// クラスにプロパティとして定義
	name: string   
	scheduled_date: string
	deadline: string
	from: string
	to: string

	constructor(options: TaskNodeModelOptions = {}) {
		super({
			...options,
			type: 'advanced'
		});

	// 初期化
		this.name = options.name || '未設定';
		this.scheduled_date = options.scheduled_date || "未設定";
		this.deadline = options.deadline || "";
		this.from = options.from || "";
		this.to = options.to || "";

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
	}


	serialize() {
		return {
			...super.serialize(),
	// JSONへのシリアライズ時の挙動
			name: this.name,
			scheduled_date: this.scheduled_date,
			deadline: this.deadline,
			from: this.from,
			to: this.to,
		};
	}

	deserialize(event: any): void {
		super.deserialize(event);
	// JSONからの復元時の挙動
		this.name = event.data.name || '未設定';
		this.scheduled_date = event.data.scheduled_date;
		this.deadline = event.data.deadline;
		this.from = event.data.from;
		this.to = event.data.to;
	}
}
