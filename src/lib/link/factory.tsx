/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/

import { DiagramEngine, DefaultLinkFactory } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel} from "./model";
import { AdvancedLinkWiget } from "./widget";

export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}


	generateReactWidget(event: any): JSX.Element {
		return <AdvancedLinkWiget diagramEngine={this.engine as DiagramEngine} link={event.model} />
	}

}