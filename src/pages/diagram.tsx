import React from "react";
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';

import "./diagram.css"
import { TaskNodeFactory } from '../lib/node/factory';
import { TaskNodeModel } from '../lib/node/model';
import { AdvancedLinkModel } from '../lib/link/model';
import { AdvancedLinkFactory } from '../lib/link/factory';
import { AdvancedPortFactory } from '../lib/port/factory';
import Navbar from "../components/navbar";


const Diagram = ({task_group_name}: {task_group_name: string}) => {
	//1) setup the diagram engine
	var engine = createEngine();
	engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
	engine.getNodeFactories().registerFactory(new TaskNodeFactory());
	engine.getPortFactories().registerFactory(new AdvancedPortFactory());

	const model = new DiagramModel();

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

	model.addAll(taskNode1, taskNode2, taskNode3, taskNode4, taskNode5, taskNode6, taskNode7, taskNode8, taskNode9, taskNode10, taskNode11, taskNode12,
	link1, link2, link3, link4, link5, link6, link7, link8, link9, link10, link11, link12, link13);
	// load model into engine
	engine.setModel(model);

	// render the diagram!
	return (
		<>
			<h2>{task_group_name}</h2>
			<CanvasWidget className="diagram-container" engine={engine} />
		</>
	);
};

export default Diagram;