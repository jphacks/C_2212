/*
	Factoryクラスでは、
		・ModelとWidgetの紐付け
	を定義する
*/

import { DefaultLinkFactory } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel, AdvancedLinkSegment } from "./model";


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
				<AdvancedLinkSegment model={model} path={path} />
			</g>
		);
	}
}