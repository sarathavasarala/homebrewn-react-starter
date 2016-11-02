import React from "react"
import ReactDOM from "react-dom"
import "../css/main.scss"

var HelloWorld = React.createClass({
	render(){
		return(
				<div>Hello World!</div>
			)
	}
})

ReactDOM.render(<HelloWorld />, document.getElementById("react-container"))