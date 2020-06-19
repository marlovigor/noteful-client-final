import React from 'react';
// import Folders from '../../Store'
import { Switch, Route, Link, withRouter } from "react-router-dom"
import Notes from './Components/notes/notes'
// import {useParams} from "react-router-dom"
import AddNotes from "./Components/notes/addNotes"
import AddFolder from "./Components/folders/addFolder"
import { FolderNoteContext } from "./FolderNoteContext"


 class App extends React.Component {


    state = {
        folders: [],
        notes: []
    }



    componentDidMount() {
        fetch('http://localhost:9090/folders')
            .then(response => response.json())
            .then(data => this.setState({ folders: data }))
        fetch('http://localhost:9090/notes')
            .then(response => response.json())
            .then(data => this.setState({ notes: data }))
    }

    handleFolderSubmit = event => {
        console.log("im being called")
        fetch('http://localhost:9090/folders')
            .then(response => response.json())
            .then(data => this.setState({ folders: data }))
            // .then(this.props.history.goBack())
            
    }
    handleNoteSubmit=()=>{
        fetch('http://localhost:9090/notes')
            .then(response => response.json())
            .then(data => this.setState({ notes: data }))
    }

    handleFolderSubmittoState = folder =>{
      this.setState({folders: [...this.state.folders, folder]})
    }

    handleNoteSubmittoState = note =>{
      this.setState({notes: [...this.state.notes, note]})
    }


    render() {

        const appValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            handleFolderSubmit: this.handleFolderSubmit,
            handleNoteSubmit: this.handleNoteSubmit,
            handleFolderSubmittoState: this.handleFolderSubmittoState,
            handleNoteSubmittoState: this.handleNoteSubmittoState,
            // deleteNote: this.deleteNote,
            // handleNoteSubmit: this.handleNoteSubmit,
            // handleFolderSubmit: this.handleFolderSubmit
        }
        // const folderitem = appValue.folders.map(item => (
        //     <div key={item.id} style={folderDiv1}>
        //         <h3 key={item.id}>
        //             <Link to={`/notes/${item.id}`}>{item.name}</Link>
        //         </h3>
        //     </div>
        const folderitem = this.state.folders.map(item => (
          <div key={item.id} style={folderDiv1}>
              <h3 key={item.id}>
                  <Link to={`/notes/${item.id}`}>{item.name}</Link>
              </h3>
          </div>
        ))

        // console.log(this.context)
        // console.log(appValue.folders)
        // console.log(appValue.notes)
        return (
          
            <FolderNoteContext.Provider value={appValue}>
            <div>
            NOTE
          </div>
                <div style={mainDiv}>
                    <Switch>
                        <Route exact path="/">
                            <div style={folderDiv}>
                                {folderitem}
                                <Link to={`/addFolder`}>ADD A Folder</Link>
                            </div>
                        </Route>
                        <Route exact path="/notes" >
                            <div style={folderDiv}>
                                {folderitem}
                                <Link to={`/addFolder`}>ADD A Folder</Link>
                            </div>
                            <Notes />
                        </Route>
                        <Route path="/notes/:notesID" >
                            <div style={folderDiv}>
                                {folderitem}
                                <Link to={`/addFolder`}>ADD A Folder</Link>
                            </div>
                            <Notes />
                        </Route>
                        <Route path="/addFolder" Component={AddFolder}>

                            <AddFolder 
                            onSubmit={this.handleAddFolder}/>
                        </Route>
                        <Route path="/addnotes" Component={AddNotes}>
                            <div style={folderDiv}>
                                {folderitem}

                            </div>
                            <AddNotes />
                        </Route>
                    </Switch>
                </div>
            </FolderNoteContext.Provider>
        )
    }
}
export default withRouter(App);



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

