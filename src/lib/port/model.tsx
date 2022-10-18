import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "../link/model";

export class AdvancedPortModel extends DefaultPortModel {

	constructor() {
		super({
			name: "advanced"
		});
	}

	createLinkModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}
}


// export interface AdvancedPortModelOptions extends BaseModelOptions {}


// export class AdvancedPortModel extends PortModel {

// 	constructor(options: AdvancedPortModelOptions = {}) {
// 		super({
// 			...options,
// 			name: "advanced"
// 		});
// 	}

// 	serialize() {
// 		return {
// 			...super.serialize(),
// 		}
// 	}

// 	deserialize(event: DeserializeEvent<this>): void {
// 		super.deserialize(event);
// 	}

// 	createLinkModel(): AdvancedLinkModel {
// 		return new AdvancedLinkModel();
// 	}
// }