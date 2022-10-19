/*
	Widgetクラスでは、
		・UI
	を定義する
*/

import { DefaultLinkWidget } from "@projectstorm/react-diagrams";



export class AdvancedLinkWiget extends DefaultLinkWidget {
	
	render() {
		return {
			...super.render()
		};
	}
}


// export interface AdvancedLinkSegmentProps {
// 	link: AdvancedLinkModel;
// 	engine: DiagramEngine;
// 	path: string;
// }

// export interface AdvancedLinkSegmentState {}

// export class AdvancedLinkSegment extends React.Component<
// 	AdvancedLinkSegmentProps,
// 	AdvancedLinkSegmentState
// > {
// 	path!: SVGPathElement | null;
// 	circle!: SVGCircleElement | null;
// 	callback!: () => any;
// 	percent: number;
// 	handle: any;
// 	mounted: boolean | undefined;

// 	constructor(props: any) {
// 		super(props);
// 		// this.path = new SVGPathElement();
// 		// this.circle = new SVGCircleElement();
// 		// this.callback = () => {};
// 		this.percent = 0;
// 		this.mounted = undefined;
// 	}

// 	componentDidMount() {
// 		this.mounted = true;
// 		this.callback = () => {
// 			if (!this.circle || !this.path) {
// 				return;
// 			}

// 			this.percent += 0.5;
// 			if (this.percent > 100) {
// 				this.percent = 0;
// 			}

// 			let point = this.path.getPointAtLength(this.path.getTotalLength() * (this.percent / 100.0));

// 			this.circle.setAttribute('cx', '' + point.x);
// 			this.circle.setAttribute('cy', '' + point.y);

// 			if (this.mounted) {
// 				requestAnimationFrame(this.callback);
// 			}
// 		};
// 		requestAnimationFrame(this.callback);
// 	}

// 	componentWillUnmount() {
// 		this.mounted = false;
// 	}

// 	render() {
// 		return (
// 			<>
// 				<path
// 					fill="none"
// 					ref={(ref) => {
// 						this.path = ref;
// 					}}
// 					strokeWidth={this.props.link.getOptions().width}
// 					stroke="rgba(255,0,0,0.5)"
// 					d={this.props.path}
// 				/>
// 				<circle
// 					ref={(ref) => {
// 						this.circle = ref;
// 					}}
// 					r={10}
// 					fill="orange"
// 				/>
// 			</>
// 		);
// 	}
// }
