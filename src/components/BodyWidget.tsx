import * as React from 'react';
import * as _ from 'lodash';
// import { Application } from '../Application';
// import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
// import { DemoCanvasWidget } from '../../helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import * as SRD from '@projectstorm/react-diagrams';
import "../pages/diagram.css"
import { AdvancedLinkFactory } from '../lib/link/factory';
import { AdvancedPortFactory } from '../lib/port/factory';
import { TaskNodeFactory } from '../lib/node/factory';
import { TaskNodeModel } from '../lib/node/model';
import { AdvancedLinkModel } from '../lib/link/model';
import { AdvancedPortModel } from '../lib/port/model';


export interface BodyWidgetProps {
	app: Application;
}

namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
		position: relative;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;

	export const Bottun = styled.div`
		cursor: pointer;
		position: absolute;
		z-index: 10;
		background-color: #F8C0C0;
		width: 80px;
		text-align: center;
		font-size: 600%;
		height: 80px;
		line-height: 50%;
		color: white;
		box-shadow: 0 10px 10px #333;
		:hover {
		color: black;
		box-shadow: none;
		  }
	`;
}


export class BodyWidget extends React.Component<BodyWidgetProps> {
	render() {
		return (
			<S.Body>
				<S.Content>
					<S.Bottun
					draggable={true}
					onDragStart={(event) => {
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify({type: 'in-out'}));
					}}
					>
					+
					</S.Bottun>
					<S.Layer
						onDrop={(event) => {
							let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							// let nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

							let node: TaskNodeModel | null = null;
							if (data.type === 'in') {
								node = new TaskNodeModel({name: "sample", scheduled_date: "10/21", deadline: "10/31"});
								node.addPort(new AdvancedPortModel({in: true, name: 'in'}));
								node.addPort(new AdvancedPortModel({in: false, name: 'out'}));
							} else {
								node = new TaskNodeModel({name: "sample", scheduled_date: "11/21", deadline: "11/31"});
								node.addPort(new AdvancedPortModel({in: true, name: 'in'}));
								node.addPort(new AdvancedPortModel({in: false, name: 'out'}));
							}
							let point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}
					>
						<CanvasWidget className="diagram-container" engine={this.props.app.getDiagramEngine()} />
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}


export class Application {
	protected activeModel!: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.newModel();
	}

	public newModel() {
		this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
		this.diagramEngine.getNodeFactories().registerFactory(new TaskNodeFactory());
		this.diagramEngine.getPortFactories().registerFactory(new AdvancedPortFactory());

		const taskNode1 = new TaskNodeModel({ name: "顧客ヒアリング", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode1.setPosition(200, 200);
		const taskNode2 = new TaskNodeModel({ name: "プロトタイプ作成", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode2.setPosition(500, 0);
		const taskNode4 = new TaskNodeModel({ name: "要件定義書作成", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode4.setPosition(500, 400);
		const taskNode6 = new TaskNodeModel({ name: "契約書締結", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode6.setPosition(800, 200);

		const taskNode3 = new TaskNodeModel({ name: "画面遷移図作成", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode3.setPosition(1100, 0);
		const taskNode5 = new TaskNodeModel({ name: "DB設計", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode5.setPosition(1100, 400);
		const taskNode7 = new TaskNodeModel({ name: "API実装", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode7.setPosition(1400, 400);
		const taskNode8 = new TaskNodeModel({ name: "フロントエンド実装", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode8.setPosition(1400, 0);

		const taskNode9 = new TaskNodeModel({ name: "結合テスト", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode9.setPosition(1700, 200);
		const taskNode10 = new TaskNodeModel({ name: "総合テスト", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode10.setPosition(2000, 200);
		const taskNode12 = new TaskNodeModel({ name: "納品", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode12.setPosition(2300, 200);
		const taskNode11 = new TaskNodeModel({ name: "検収修正", scheduled_date: `${new Date().getMonth() + 1}/${new Date().getDate()}` });
		taskNode11.setPosition(2600, 200);

		const link1 = new AdvancedLinkModel()
		link1.setSourcePort(taskNode1.getPort("out")!)
		link1.setTargetPort(taskNode2.getPort("in")!)
		const link2 = new AdvancedLinkModel()
		link2.setSourcePort(taskNode1.getPort("out")!)
		link2.setTargetPort(taskNode4.getPort("in")!)
		const link3 = new AdvancedLinkModel()
		link3.setSourcePort(taskNode2.getPort("out")!)
		link3.setTargetPort(taskNode6.getPort("in")!)
		const link4 = new AdvancedLinkModel()
		link4.setSourcePort(taskNode4.getPort("out")!)
		link4.setTargetPort(taskNode6.getPort("in")!)

		const link5 = new AdvancedLinkModel()
		link5.setSourcePort(taskNode6.getPort("out")!)
		link5.setTargetPort(taskNode3.getPort("in")!)
		const link6 = new AdvancedLinkModel()
		link6.setSourcePort(taskNode6.getPort("out")!)
		link6.setTargetPort(taskNode5.getPort("in")!)
		const link7 = new AdvancedLinkModel()
		link7.setSourcePort(taskNode3.getPort("out")!)
		link7.setTargetPort(taskNode8.getPort("in")!)
		const link8 = new AdvancedLinkModel()
		link8.setSourcePort(taskNode5.getPort("out")!)
		link8.setTargetPort(taskNode7.getPort("in")!)
		const link9 = new AdvancedLinkModel()
		link9.setSourcePort(taskNode7.getPort("out")!)
		link9.setTargetPort(taskNode9.getPort("in")!)

		const link10 = new AdvancedLinkModel()
		link10.setSourcePort(taskNode8.getPort("out")!)
		link10.setTargetPort(taskNode9.getPort("in")!)

		const link11 = new AdvancedLinkModel()
		link11.setSourcePort(taskNode9.getPort("out")!)
		link11.setTargetPort(taskNode10.getPort("in")!)

		const link12 = new AdvancedLinkModel()
		link12.setSourcePort(taskNode10.getPort("out")!)
		link12.setTargetPort(taskNode12.getPort("in")!)

		const link13 = new AdvancedLinkModel()
		link13.setSourcePort(taskNode12.getPort("out")!)
		link13.setTargetPort(taskNode11.getPort("in")!)

		
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);
		this.activeModel.addAll(taskNode1, taskNode2, taskNode3, taskNode4, taskNode5, taskNode6, taskNode7, taskNode8, taskNode9, taskNode10, taskNode11, taskNode12,
		link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12, link13);

	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}