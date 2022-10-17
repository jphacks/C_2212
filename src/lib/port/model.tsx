import { DefaultPortModel } from "@projectstorm/react-diagrams";
import { AdvancedLinkModel } from "../link/model";



export class AdvancedPortModel extends DefaultPortModel {
	createLinkModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}
}