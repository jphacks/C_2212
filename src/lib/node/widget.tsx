/*
	Widgetクラスでは、
		・UI
	を定義する
*/


import { DiagramEngine } from "@projectstorm/react-diagrams";
import React from "react";
import { AdvancedPortWidget } from "../port/widget";
import { TaskNodeModel } from "./model";

import "./node.css"

export interface TaskNodeWidgetProps {
	node: TaskNodeModel;
	engine: DiagramEngine;
}
  
export interface TaskNodeWidgetState {}
  
export class TaskNodeWidget extends React.Component<
	TaskNodeWidgetProps,
	TaskNodeWidgetState
> {
	constructor(props: TaskNodeWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div style={{ width: "15vw" }} className="task-node">
				{this.props.node.getPort("in") && (
				<AdvancedPortWidget
					engine={this.props.engine}
					port={this.props.node.getPort("in")!}
					className="task-port-in"
				>
					<div />
				</AdvancedPortWidget>
				)}
				{this.props.node.getPort("out") && (
				<AdvancedPortWidget
					engine={this.props.engine}
					port={this.props.node.getPort("out")!}
					className="task-port-out"
				>
					<div />
				</AdvancedPortWidget>
				)}
				<div className="task-node-content has-text-light">
					<h1 className="task-node-title">{this.props.node.name}</h1>
					<ol className="task-node-detail">
						<h1 className="expected_date">{this.props.node.scheduled_date}</h1>
							<b>締切：</b>
							<b>{this.props.node.deadline}</b>
					</ol>
				</div>
			</div>
		);
	}
}