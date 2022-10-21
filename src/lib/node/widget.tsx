/*
	Widgetクラスでは、
		・UI
	を定義する
*/


import { DiagramEngine } from "@projectstorm/react-diagrams";
import React from "react";
import { AdvancedPortWidget } from "../port/widget";
import { TaskNodeModel } from "./model";
import styled from '@emotion/styled';

import "./node.css"


export const Port = styled.div`
	width: 10px;
	height: 10px;
	background-color: yellow;
	border-radius: 50%;
	transform: translate(-5px);
	:hover {
		background-color: red;
	}
`

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
					<Port />
				</AdvancedPortWidget>
				)}

				{this.props.node.getPort("out") && (
				<AdvancedPortWidget
					engine={this.props.engine}
					port={this.props.node.getPort("out")!}
					className="task-port-out"
				>
					<Port />
				</AdvancedPortWidget>
				)}
				<div className="task-node-content has-text-light">
					<p className="task-node-title">{this.props.node.name}</p>
					<ul className="task-node-detail">
						<li>
							<b>予定日：</b>
							<b>{this.props.node.scheduled_date}</b>
						</li>
						<li>
							<b>締切：</b>
							<b>{this.props.node.deadline}</b>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}