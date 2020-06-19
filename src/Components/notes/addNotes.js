import React, { Component } from 'react'
import { FolderNoteContext } from "../../FolderNoteContext"
import {withRouter } from "react-router-dom"
const newDate = new Date()


 class AddNotes extends Component {

    state = {
        folderId: 0,
        id: Math.ceil(Math.random() * 10000000).toString(),
        modified: newDate,
        name: '',
        content: '',
    }

    static contextType = FolderNoteContext;

    handleChange= event =>{
		const {name, value} = event.target
		this.setState({
			[name]: value
        })
        console.log(this.state.name)
	}

    folderSelection = (e) => {
        this.setState({folderId: e.target.value});
        console.log(this.state.folderId)
    }

    handleClick=(e)=>{
        e.preventDefault()
        const newNote= this.state

		fetch('http://localhost:9090/notes', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {'content-type': 'application/json'}
		})
		.then(this.context.handleNoteSubmittoState(newNote))

    }

    render() {

        const folderoptions = this.context.folders.map(option => {
            return (
                <option value={option.id}>{option.name}</option>
            )
        })
        console.log(folderoptions)
        return (
            <div>
                <form onSubmit={this.handleClick}>
                <select
                    className="folderNoteSelect__control"
                    id="folderChoice"
                    name="Folder"
                    onChange={this.folderSelection}
                >
                    <option value="None">Select Folder</option>
                    {folderoptions}
                </select>
                    {/* {folderoptions}<br></br> */}
                    <input onChange={this.handleChange} name="name" placeholder={'note name'}></input><br></br>
                    <textarea name="content" onChange={this.handleChange} placeholder={'enter here'}></textarea>
                    <button>add Note</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddNotes)
