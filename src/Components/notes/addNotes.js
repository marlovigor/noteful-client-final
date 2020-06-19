import React, { Component } from 'react'
import { FolderNoteContext } from "../../FolderNoteContext"
import { withRouter } from "react-router-dom"
const newDate = new Date()


class AddNotes extends Component {

    state = {
        note: {
            folderId: 0,
            id: Math.ceil(Math.random() * 10000000).toString(),
            modified: newDate,
            name: '',
            content: '',
        },
        nameTouched: false,
        contentTouched: false,
    }

    static contextType = FolderNoteContext;


    handleNameValidation(input) {
        if (input.length < 1) {
          this.setState({
              nameTouched: false,
          });
        }
      }
    
      // handles verification of note content
      // and ensures user doesn't try to submit
      // empty note content
      handleContentValidation(input) {
        if (input.length < 1) {
          this.setState({
              contentTouched: false,
          });
        }
      }





    handleNameChange = event => {
        const newNote = this.state.note
        newNote.name = event.target.value;
        this.setState({
            note: newNote,
            nameTouched: true,
        },
        () => this.handleNameValidation(newNote.name)
        )

        // console.log(this.state.note.content)
    }

    handleContentChange = event => {
        const newNote = this.state.note
        newNote.content = event.target.value;
        this.setState({
            note: newNote,
            contentTouched: true,
        },
        () => this.handleContentValidation(newNote.content)
        )
        // console.log(this.state.note.content)
    }

    folderSelection = (e) => {
        const newNote = this.state.note
        newNote.folderId = e.target.value
        this.setState({ note: newNote });
        console.log(newNote)
    }

    handleClick = (e) => {
        e.preventDefault()
        const newNote = this.state.note
        console.log(newNote)

        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: { 'content-type': 'application/json' }
        })
            .then(this.context.handleNoteSubmittoState(newNote))

    }

    render() {

        const folderoptions = this.context.folders.map(option => {
            return (
                <option key={option.id} value={option.id}>{option.name}</option>
            )
        })
        // console.log(folderoptions)
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
                    <input onChange={this.handleNameChange} name="name" placeholder={'note name'}></input><br></br>
                    <textarea name="content" onChange={this.handleContentChange} placeholder={'enter here'}></textarea>
                    <button disabled={
                        !this.state.contentTouched || !this.state.nameTouched
                    }>add Note</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddNotes)
