import React from 'react';
import Folders from '/Users//Jones/notfulappfull//src/Store'
import Folderprops from './folderprops';
import { Switch, Route, Link } from "react-router-dom"
import Notes from '../notes/notes'
import {useParams} from "react-router-dom"

export default class Folder extends React.Component {

    state = {
        data: Folders
    }

    render() {
        const folderitem = this.state.data.folders.map(item => (
            <div style={folderDiv1}>
            <h3 key={item.id}>
                <Link to={`/notes/${item.id}`}>{item.name}</Link>
            </h3>
            </div>
        ))

        return (
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
        )
    }
}




const mainDiv={
    borderStyle: 'solid',
  borderColor: 'red',
    width:'80%',
    margin:'0 auto'
    
}
const folderDiv1={


}

const folderDiv={
    width:"33%",
    borderStyle: 'solid',
    borderColor: 'green',
    float:'left'

}

const folderStyle={
    color:'brown',
    fontSize:'2em'
}

