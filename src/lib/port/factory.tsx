/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/

import { DefaultPortFactory, DiagramEngine } from "@projectstorm/react-diagrams";
import { AdvancedPortModel } from "./model";
import { GenerateWidgetEvent } from "@projectstorm/react-canvas-core"
import { AdvancedPortWidget } from "./widget";


export class AdvancedPortFactory extends DefaultPortFactory {

	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor() {
		super();
	}

	generateModel(): AdvancedPortModel {
		return new AdvancedPortModel();
	}


	generateReactWidget(event: GenerateWidgetEvent<AdvancedPortModel>): JSX.Element {
		return <AdvancedPortWidget engine={this.engine as DiagramEngine} port={event.model} />;
	}
}