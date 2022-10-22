import React from "react";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../components/navbar";
// import Navbar from "../components/navbar"

import homepageImg from "../images/homepageImage.png";

const Home = () => {
	
	return (
		<div className="homepage">
			<Navbar />
			<section className="wrapper2">
				<div className="container">
					<div className="content">
						<h2 className="heading">JunSche</h2>
						<p>シュンスケ　－順に並べるスケジュール－</p>
						<p>条件を付けて予定を組めるスケジュール管理アプリ</p>
					</div>
				</div>
			</section>
			<section className="wrapper">
			<div className="container">
				<div className="content">
					<div className="content-item">
						<img src={homepageImg} className="image"/>
					</div>    
					<div className="content-item">
						<div className="text">
							<h2 className="heading">What is JunSche?</h2>
							<p>多忙な人にとって予定の前後関係の把握にオーバーフローした経験はありませんか？<br/>JunScheを使えば全て解決。カレンダーをフローチャート形式で設計できて、予定の日付はもちろん、今日やるべきこと、次にやるべきこと、予定の条件などを全て"見える化"できます。</p>
						</div>
					</div>
				</div>
			</div>
			</section>
		</div>
	)
}


export default Home;