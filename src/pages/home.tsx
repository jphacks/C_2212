import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const sample_contents_ls_html = [
	"shakou", "math_exam", "TOEIC"
];

// コンポーネント
const TaskNavList = ({show}: {show: Boolean}) => {

	const style = {
		disply: "none"
	}
	if (show) style.disply = "block";

	return (
		<div className='chart-list'>
			{sample_contents_ls_html.map((clh) => {
				return ( 
					<div style={{display: style.disply}} key={clh}>
						<Link to={`/tasks?=${clh}`}>{clh}</Link>
					</div>
					)
				})
			}
		</div>
	)
}

const Home = () => {


	const [isShowDropDown, setIsShowDropDown] = useState<Boolean>(false);

	const hDorpDown = () => {
		console.log(isShowDropDown)
		setIsShowDropDown(prev => !prev);
	}
	
	return (
		<div id='menu_bar'>
			<div className='web-title'>
			  	junsche
			</div>
			<div className="container">
				<div className='drop_down'>
					<button onClick={hDorpDown}>チャート一覧</button>
				</div>
				<div className="temp">
					<TaskNavList show={isShowDropDown}/>
				</div>
			</div>
		</div>
	)
}


export default Home;