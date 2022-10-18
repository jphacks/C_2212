/*
	Modelクラスでは、
		・データ
		・ロジック
	を定義する
*/

import { DefaultLinkModel } from "@projectstorm/react-diagrams";


export class AdvancedLinkModel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'advanced',
			width: 10
		});
	}
}
