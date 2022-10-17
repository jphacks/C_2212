import React, { useState } from "react"
import { Link } from "react-router-dom";
import "./home.css"

const sample_contents_ls_html = [
	"shakou", "math_exam", "TOEIC"
];


const TaskNavList = ({show}: {show: Boolean}) => {

	const style = {
		disply: "none"
	}
	if (show) style.disply = "block";

	return (
		<>
			{sample_contents_ls_html.map((clh) => {
				return ( 
					<div style={{display: style.disply}} key={clh}>
						<Link to={`/tasks?=${clh}`}>{clh}</Link>
					</div>
					)
				})
			}
		</>
	)
}

const Home = () => {


	const [isShowDropDown, setIsShowDropDown] = useState<Boolean>(false);

	const hDorpDown = () => {
		console.log(isShowDropDown)
		setIsShowDropDown(prev => !prev);
	}
	
	return (
	  <div>
		  <div id='menu_bar'>
			  junsche
			  <button className='drop_down' onClick={hDorpDown}>チャート一覧</button>
		  </div>
		  <div>
		  	<TaskNavList show={isShowDropDown}/>
		  </div>
	  </div>
	)
}


export default Home;