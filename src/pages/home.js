import React from "react"



const Home = () => {
	let url_dict = {'車校':'http://schedule&target="車校"'}	//dict comprise {content:url} 
	const contents_ls_html = []
	for(let content in url_dict){
		contents_ls_html.push(<a align='right' href={url_dict[content]} key={url_dict[content]}>{content}</a>)
	}
	return (
	  <div>
		  <div id='menu_bar'>
			  junsche
			  <button className='drop_down' onClick={() => {document.getElementById("contents_ls").classList.toggle("show");}}>チャート一覧</button>
		  </div>
		  <div id='contents_ls' className='contents_ls'>
					{contents_ls_html}
		  </div>
	  </div>
	)
}

window.onclick = function(event) {
	if (!event.target.matches('.drop_down')) {
	  var dropdowns = document.getElementsByClassName("contents_ls");
	  var i;
	  for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		  openDropdown.classList.remove('show');
		}
	  }
	}
  }


export default Home;