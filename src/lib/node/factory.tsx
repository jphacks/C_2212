/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/


import { DiagramEngine } from "@projectstorm/react-diagrams";
import { TaskNodeModel } from "./model";

import { BaseModel, CanvasEngine, AbstractModelFactory } from "@projectstorm/react-canvas-core"
import { TaskNodeWidget } from "./widget";


export interface GenerateWidgetEvent<T extends BaseModel> {
	model: T;
}

export abstract class AbstractReactFactory<
	T extends BaseModel = BaseModel,
	E extends CanvasEngine = CanvasEngine
> extends AbstractModelFactory<T, E> {
	abstract generateReactWidget(event: GenerateWidgetEvent<T>): JSX.Element
}

export class TaskNodeFactory extends AbstractReactFactory<TaskNodeModel, DiagramEngine> {
	constructor() {
		super('default');
	}

	generateModel(initialConfig: any) {
		return new TaskNodeModel();
	}

	generateReactWidget(event: any): JSX.Element {
		return <TaskNodeWidget engine={this.engine as DiagramEngine} node={event.model} />;
	}
}
