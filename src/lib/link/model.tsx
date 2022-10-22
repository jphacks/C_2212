/*
	Modelクラスでは、
		・データ
		・ロジック
	を定義する
*/

import { DefaultLinkModel } from "@projectstorm/react-diagrams";
// import { localStorageManager } from "../localstorage/manager";


export class AdvancedLinkModel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'advanced',
			width: 5,
			color: "orange"
		});
	}

	link(taskNode: any, to: string, taskNodes: any) {
		if (to === "") return this;
		const inTaskNode = taskNodes.find((tn: any) => tn.name === to);
		if (!inTaskNode) return this;
		this.setSourcePort(taskNode.getPort("out")!)
		this.setTargetPort(inTaskNode.getPort("in")!)
		return this;
	}

	remove() {
		// HACK: linkが消された時、localStorageの該当task_groupのtasksの中の該当taskのtoを消す
		// const to = this.getTargetPort()
		super.remove();
	}
}
