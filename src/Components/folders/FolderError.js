import React from 'react'
import PropTypes from 'prop-types'
import { thisTypeAnnotation } from '@babel/types';

class FolderError extends React.Component{
	state = {
		hasError: false
	}

	componentDidCatch(hasError){
        this.setState({
            hasError:true
        })
    }

	render(){
		return (
			this.state.hasError ? <h2>There was an error with your folders /Reload</h2> : this.props.children
			)
	}
}

export default FolderError