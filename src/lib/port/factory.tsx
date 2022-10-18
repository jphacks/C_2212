/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/

import { DiagramEngine } from "@projectstorm/react-diagrams";
import { AdvancedPortModel } from "./model";
import { AbstractReactFactory, GenerateWidgetEvent } from "@projectstorm/react-canvas-core"
import { AdvancedPortWidget } from "./widget";


export class AdvancedPortFactory extends AbstractReactFactory<AdvancedPortModel, DiagramEngine> {

	constructor() {
		super("advanced");
	}

	generateModel(): AdvancedPortModel {
		return new AdvancedPortModel();
	}


	generateReactWidget(event: GenerateWidgetEvent<AdvancedPortModel>): JSX.Element {
		return <AdvancedPortWidget engine={this.engine as DiagramEngine} port={event.model} />;
	}
}