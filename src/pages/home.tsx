import React from "react";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../components/navbar";
// import Navbar from "../components/navbar"

const Home = () => {
	
	return (
		<>
			<Navbar />
			<p>this is <b>Home</b> page</p>
			<p>ホームページ（ミニマムじゃないよ）</p>
		</>
	)
}


export default Home;