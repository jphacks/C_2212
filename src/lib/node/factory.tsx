/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/


import { DiagramEngine } from "@projectstorm/react-diagrams";
import { TaskNodeModel } from "./model";

// import { BaseModel, CanvasEngine, AbstractModelFactory } from "@projectstorm/react-canvas-core"
import { TaskNodeWidget } from "./widget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core"


export class TaskNodeFactory extends AbstractReactFactory<TaskNodeModel, DiagramEngine> {
	constructor() {
		super('advanced');
	}

	generateModel(initialConfig: any) {
		return new TaskNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <TaskNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
