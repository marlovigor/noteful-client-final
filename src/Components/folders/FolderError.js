import React from 'react'


class FolderError extends React.Component{
	state = {
		hasError: false
	}

	static getDerivedStateFromError(error) {
		console.log('here')
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	  }

	render(){
		return (
			this.state.hasError ? <h2>There was an error with your folders /Reload</h2> : this.props.children
			)
	}
}

export default FolderError