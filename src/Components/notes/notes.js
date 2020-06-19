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
                <button>delete</button>
            </div>
        )
    }
    )
    return (
        <div style={notediv}>
            {note}
            <Link to={`/addnotes`}>AddNotes</Link>
        </div>
    )
}


const notediv = {
    borderStyle: 'solid',
    borderColor: 'yellow',
    width: '55%',
    float: 'right'



}
const notediv1 = {

}

const notetitle = {
    color: 'red'

}

const notecontent = {

}