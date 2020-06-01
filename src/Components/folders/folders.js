import React from 'react';
// import Folders from '../../Store'
import { Switch, Route, Link } from "react-router-dom"
import Notes from '../notes/notes'
// import {useParams} from "react-router-dom"
import  {FolderNoteContext}  from "../../FolderNoteContext"

export default class Folder extends React.Component {

    state = {
        folders: [],
        notes: []
    }


    componentDidMount() {
        fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(data => this.setState({folders: data}))
      fetch('http://localhost:9090/notes')
      .then(response => response.json())
      .then(data => this.setState({notes: data}))
    } 
    render() {
        
        const appValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            // deleteNote: this.deleteNote,
            // handleNoteSubmit: this.handleNoteSubmit,
            // handleFolderSubmit: this.handleFolderSubmit
          }
        const folderitem = appValue.folders.map(item => (
            <div style={folderDiv1}>
                <h3 key={item.id}>
                    <Link to={`/notes/${item.id}`}>{item.name}</Link>
                </h3>
            </div>
        ))

        // console.log(this.context)
        console.log(appValue.folders)
        console.log(appValue.notes)
        return (
            <FolderNoteContext.Provider value={appValue}>
            <div style={mainDiv}>
                <Switch>
                    <Route exact path="/">
                        <div style={folderDiv}>
                            {folderitem}
                        </div>
                    </Route>
                    <Route exact path="/notes" >
                        <div style={folderDiv}>
                            {folderitem}
                        </div>
                        <Notes />
                    </Route>
                    <Route path="/notes/:notesID" >
                        <div style={folderDiv}>
                            {folderitem}
                        </div>
                        <Notes />
                    </Route>
                </Switch>
            </div>
            </FolderNoteContext.Provider>
        )
    }
}




const mainDiv = {
    borderStyle: 'solid',
    borderColor: 'red',
    width: '80%',
    margin: '0 auto'

}
const folderDiv1 = {


}

const folderDiv = {
    width: "33%",
    borderStyle: 'solid',
    borderColor: 'green',
    float: 'left'

}

const folderStyle = {
    color: 'brown',
    fontSize: '2em'
}

