import React, { Component } from 'react'
import { FolderNoteContext } from "../../FolderNoteContext"
import { withRouter } from 'react-router'
import addNotes from '../notes/addNotes';

const { v4: uuidv4 } = require('uuid');

class AddFolder extends Component {
    state = {
        folder: {
            id: uuidv4(),
            title: '',
        },
        touched: false,
        errorMessage: "",
    }
    static contextType = FolderNoteContext


    validateNameInput(value) {
        // checks if user has inputted any chars
        // and blocks user from submitting a nameless folder
        if (value.length < 1) {
            this.setState({
                touched: false,
                errorMessage: "Folder name can't be empty.",
            });
        }
        // checks if folder name is 10 chars long
        // to maintain usable UI
        if (value.length > 10) {
            this.setState({
                touched: false,
                errorMessage: "10 characters is max length.",
            });
        }
    }

    handleChange = event => {
        const newFolders = this.state.folder
        newFolders.title = event.target.value
        const folderName = event.target.value
        this.setState({
            folder:newFolders,
            touched: true,
            errorMessage: "",
        },
            () => this.validateNameInput(folderName)
        )
        // console.log(event.target.value)
    }
    handleSubmit = event => {
        event.preventDefault()
        // const newFolder = {
        //     id: this.context.folders.length + 1,
        //     name: this.state.name
        // }
        const newFolders = this.state.folder
        fetch('http://localhost:8000/folders', {
            method: 'POST',
            body: JSON.stringify(this.state.folder),
            headers: { 'content-type': 'application/json' }
        })
            .then(this.context.handleFolderSubmittoState(newFolders))
            .then(this.props.history.goBack())

    }

    render() {
        console.log(JSON.stringify(this.state.folder))
        return (
            <div style={addFolderDiv}>
                <form style={addFolder} onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} ref={this.folderInput} />
                    {this.state.errorMessage && (
                        <p className="error-msg">{this.state.errorMessage}</p>
                    )}
                    <button disabled={!this.state.touched} type="submit" >add folder</button>
                </form>

            </div>
        )
    }
}


const addFolderDiv={
    width:'100%',

}

const addFolder ={
    textAlign:'center'
}

export default withRouter(AddFolder)