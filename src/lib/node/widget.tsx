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
		this.props.node.saveToLocalStorage();
		// console.log(this.props.node);
		// console.log(localStorageManager.getData());
	}

	render() {
		return (
			<div style={{ width: "20vw" , height: "25vh"}} className="task-node">
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
					<div className="pink_zone">
						<h1 className="expected_date">{this.props.node.scheduled_date}</h1>
						<h1 className="deadline">締切：<br/>
							{/* {this.props.node.deadline} */}12/31
						</h1>
					</div>
					<div className="white_zone">
						<h1 className="task-node-title">{this.props.node.name}
							<br/>	
						<h2 className="task_detail">{/* {this.props.node.detail} */}この予定多分無理</h2>
						</h1>
					</div>
				</div>
			</div>
		);
	}
}