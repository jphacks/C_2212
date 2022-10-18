import { DiagramEngine } from "@projectstorm/react-diagrams";
import React from "react";
import { AdvancedPortModel } from "./model";

/*
	Widgetクラスでは、
		・UI
	を定義する
*/

export interface AdvancedPortWidgetProps {
	port: AdvancedPortModel;
	engine: DiagramEngine;
}


export interface AdvancedPortWidgetState {}

export class AdvancedPortWidget extends React.Component<
	AdvancedPortWidgetProps,
	AdvancedPortWidgetState
> {
	constructor(props: AdvancedPortWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
			</>
		)
	}
}

