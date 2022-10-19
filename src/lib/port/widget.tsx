import { DiagramEngine, PortProps } from "@projectstorm/react-diagrams";
import React from "react";
import { AdvancedPortModel } from "./model";

/*
	Widgetクラスでは、
		・UI
	を定義する
*/

import { PortWidget } from "@projectstorm/react-diagrams";



export interface AdvancedPortWidget extends PortProps {}

export class AdvancedPortWidget extends PortWidget {
	constructor(props: AdvancedPortWidget) {
		super(props as PortProps);
	}

	render() {
		return (
			super.render()
		);
	}
}


// export interface AdvancedPortWidgetProps {
// 	port: AdvancedPortModel;
// 	engine: DiagramEngine;
// }


// export interface AdvancedPortWidgetState {}

// export class AdvancedPortWidget extends React.Component<
// 	AdvancedPortWidgetProps,
// 	AdvancedPortWidgetState
// > {
// 	constructor(props: AdvancedPortWidgetProps) {
// 		super(props);
// 		this.state = {};
// 	}

// 	render() {
// 		return (
// 			super.render()
// 		)
// 	}
// }

