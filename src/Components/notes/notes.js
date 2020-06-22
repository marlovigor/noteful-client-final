import React from 'react';
import { useContext } from 'react';
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { FolderNoteContext } from "../../FolderNoteContext"




export default function Notes() {
    const value = useContext(FolderNoteContext);
    const { notesID } = useParams();
    // console.log(value.notes)
    const filteredNotes = value.notes.filter(note => note.folderId === notesID)
    const note = filteredNotes.map(note => {
        return (
            <div key={note.id} style={notediv1}>
                <h3 style={notetitle}>{note.name}</h3>
                <p style={notecontent}>{note.content}</p>
                <button onClick={() => DeleteNotes(note.id)}>delete</button>
            </div>
        )
     }
    )
    function DeleteNotes(noteid) {
        fetch(`http://localhost:9090/notes/${noteid}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
        .then(() => {
            value.deletNote(noteid);
          })
        console.log()
    }
    return (
        <div style={notediv}>
            {note}
            <div>
            <Link to={`/addnotes`}><button>AddNotes</button></Link>
            </div>
        </div>
    )
}


const notediv = {
    borderStyle: 'solid',
    borderColor: 'yellow',
    width: '55%',
    float: 'right',
    borderRadius:'30px',
    padding:'15px'



}
const notediv1 = {

}

const notetitle = {
    color: 'red'

}

const notecontent = {

}