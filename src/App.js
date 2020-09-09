import React from 'react';
// import Folders from '../../Store'
import { Switch, Route, Link, withRouter } from "react-router-dom"
import Notes from './Components/notes/notes'
import Folder from './Components/folders/Folder'
// import {useParams} from "react-router-dom"
import AddNotes from "./Components/notes/addNotes"
import AddFolder from "./Components/folders/addFolder"
import { FolderNoteContext } from "./FolderNoteContext"
import FolderError from "./Components/folders/FolderError"

console.log(process.env)


 class App extends React.Component {


    state = {
        folders: [],
        notes: [],
        currentUser:{}
    }



    componentDidMount() {
        fetch('http://localhost:8000/folders')
            .then(response => response.json())
            .then(data => this.setState({ folders: data }))
        fetch('http://localhost:8000/notes')
            .then(response => response.json())
            .then(data => this.setState({ notes: data }))
    }

    handleFolderSubmit = event => {
        console.log("im being called")
        fetch('http://localhost:8000/folders')
            .then(response => response.json())
            .then(data => this.setState({ folders: data }))
            // .then(this.props.history.goBack())
            
    }
    handleNoteSubmit=()=>{
        fetch('http://localhost:8000/notes')
            .then(response => response.json())
            .then(data => this.setState({ notes: data }))
    }

    handleFolderSubmittoState = folder =>{
      this.setState({folders: [...this.state.folders, folder]})
    }

    handleNoteSubmittoState = note =>{
      this.setState({notes: [...this.state.notes, note]})
    }

    handleDeleteNote = (noteId) => {
        this.setState({
          ...this.state,
          notes: this.state.notes.filter((note) => note.id !== +noteId),
        });
      };

      fetchCurrentuser(){
        fetch('http://localhost:8000/notes')
        .then(response => response.json())
        .then(data => this.setState({ currentUser: data }))
      }


    render() {
        console.log(this.state.folders)

        const appValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            handleFolderSubmit: this.handleFolderSubmit,
            handleNoteSubmit: this.handleNoteSubmit,
            handleFolderSubmittoState: this.handleFolderSubmittoState,
            handleNoteSubmittoState: this.handleNoteSubmittoState,
            deletNote: this.handleDeleteNote,
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
            <Folder key={item.id} style={folderDiv1} name={item.title} id={item.id}/>
        //   <div key={item.id} style={folderDiv1}>
        //       <h3 key={item.id}>
        //           <Link to={`/notes/${item.id}`}>{item.name}</Link>
        //       </h3>
        //   </div>
        ))
        console.log(folderitem)

        // console.log(this.context)
        // console.log(appValue.folders)
        // console.log(appValue.notes)
        return (
          
            <FolderNoteContext.Provider value={appValue}>
            <div style={titleDiv}>
            
            <h1 style={title}>Relax and Take Notes</h1>
          </div>
                <div style={mainDiv}>
                    <Switch>
                        <Route exact path="/">
                            <div style={folderDiv}>
                            <FolderError>
                                {folderitem}
                                </FolderError>
                                <Link to={`/addFolder`}>ADD A Folder</Link>
                            </div>
                        </Route>
                        <Route exact path="/notes" >
                            <div style={folderDiv}>
                            <FolderError>
                                {folderitem}
                                </FolderError>
                                <Link to={`/addFolder`}>ADD A Folder</Link>
                            </div>
                            <Notes />
                        </Route>
                        <Route path="/notes/:notesID" component={Notes} >
                            <div style={folderDiv}>
                            <FolderError>
                                {folderitem}
                                </FolderError>
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
                            <FolderError>
                                {folderitem}
                                </FolderError>

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

const titleDiv={
    width:"100%",
    margin:'0 auto',
}

const title ={
    color:'grey',
    textAlign:'center'
}


const mainDiv = {

    width: '60%',
    margin: '0 auto'

}

const folderDiv1 = {


}

const folderDiv = {
    width: "33%",
    borderStyle: 'solid',
    borderColor: 'Blue',
    float: 'left',
    borderRadius:'30px',
    padding:'15px'

}

const folderStyle = {
    color: 'brown',
    fontSize: '2em'
}

