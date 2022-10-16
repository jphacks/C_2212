/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/

import { DefaultLinkFactory, DiagramEngine } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel} from "./model";
import { AdvancedLinkSegment } from "./widget";


export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}

	generateLinkSegment(model: AdvancedLinkModel, selected: boolean, path: string) {
		return (
			<g>
				<AdvancedLinkSegment engine={this.engine as DiagramEngine} node={model} path={path} />
			</g>
		);
	}
}