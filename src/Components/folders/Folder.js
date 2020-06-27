import React, { Component } from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


export default class Folder extends Component {
    render() {
        return (
            <h3><Link to={`/notes/${this.props.id}`}>{this.props.name}</Link></h3>
        )
    }
}

Folder.propTypes={
    name: PropTypes.string
}
