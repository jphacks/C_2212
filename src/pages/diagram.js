import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';

import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultLinkModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from '@projectstorm/react-canvas-core';



const Diagram = () => {

	const engine = createEngine();

	const model = new DiagramModel();

	const node1 = new DefaultNodeModel({
	name: "ノード1"
	});
	node1.setPosition(300, 200);
	node1.addInPort("ポート1-1");
	node1.addInPort("ポート1-2");

	const node2 = new DefaultNodeModel({
	name: "ノード2"
	});
	node2.setPosition(100, 400);
	node2.addOutPort("ポート2-1");

	const link1 = new DefaultLinkModel()
	link1.setTargetPort(node1.getPort("ポート1-1"))
	link1.setSourcePort(node2.getPort("ポート2-1"))

	model.addAll(node1, node2, link1);

	// install the model into the engine
	engine.setModel(model);

	// Diagram page
	return (
		<CanvasWidget className="diagram-container" engine={engine} />
	)
}

export default Diagram;