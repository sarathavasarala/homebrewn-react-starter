import React from "react"
import ReactDOM from "react-dom"
import $ from "jquery"
import "../css/main.scss"

var HackerNewsCards = React.createClass({
	getInitialState(){
		return {
				ids:[], 
				storyTitles:[],
				loading: true
			}
	},
	componentDidMount(){
		this.fetchBestStoryIds()
	},
	fetchBestStoryIds(){
		return $.getJSON("https://hacker-news.firebaseio.com/v0/newstories.json")
	  	.then((data) => {
	    	this.setState({ ids: data })
	  	})
	  	.then(() => {
	  			this.fetchBestStories()
	  	})
	},
	fetchBestStories(){
		this.state.ids.slice(0, 10).forEach(function(id, i){
			$.getJSON("https://hacker-news.firebaseio.com/v0/item/"+id+".json")
			.then((data) => {
				var newData = [...this.state.storyTitles, data.title]
				this.setState({storyTitles: newData, loading:false})
			})
		}, this)
	},
	renderCard(){
		let allCards = this.state.storyTitles.map(function(val, key){
				return <div className="hnCard" key = {key}> {val} </div>
		})
		return (<div>
					{allCards}
				</div>)	
	},
	renderShell(){
		return (<div className="shell">
				<div className="line long"></div>
				<div className="line"></div>
			</div>)
	},
	render(){
		if(this.state.loading){
			return this.renderShell()
		}
		else{
			return this.renderCard()
		}
	}
})

ReactDOM.render(<div className="wrapper"><HackerNewsCards /></div>, document.getElementById("react-container"))