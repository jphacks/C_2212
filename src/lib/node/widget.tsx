/*
	Widgetクラスでは、
		・UI
	を定義する
*/


import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import React from "react";
import { TaskNodeModel } from "./model";

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
  
	addProgress(percent: number) {
	  this.props.node.addProgress(percent);
	}
  
	downProgress(percent: number) {
	  this.props.node.downProgress(percent);
	}
  
	render() {
	  return (
		<div className="task-node">
		  {this.props.node.getPort("in") && (
			<PortWidget
			  engine={this.props.engine}
			  port={this.props.node.getPort("in")!}
			>
			  <div className="circle-port" />
			</PortWidget>
		  )}
  
		  {this.props.node.getPort("out") && (
			<PortWidget
			  engine={this.props.engine}
			  port={this.props.node.getPort("out")!}
			>
			  <div className="circle-port" />
			</PortWidget>
		  )}
		  <div className="task-node-content has-text-light">
			<p>
			  <b>{this.props.node.name}</b>
			</p>
			<p>
			  <b>{this.props.node.scheduledWorkDays}</b>日（
			  <b>{this.props.node.progress}</b>%）
			</p>
			<div className="field has-addons">
			  <p className="control">
				<button
				  onMouseDown={() => this.addProgress(10)}
				  className="button is-small"
				>
				  10%👍
				</button>
			  </p>
			  <p className="control">
				<button
				  onMouseDown={() => this.downProgress(10)}
				  className="button is-small"
				>
				  10%👎
				</button>
			  </p>
			</div>
		  </div>
		</div>
	  );
	}
  }