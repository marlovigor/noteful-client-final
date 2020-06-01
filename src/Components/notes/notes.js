import React from 'react';
import { useContext } from 'react';
import {useParams} from "react-router-dom"
import {FolderNoteContext} from "../../FolderNoteContext"

export default function Notes() {
    const value = useContext(FolderNoteContext);
    const {notesID} = useParams();
    // console.log(value.notes)
    const note = value.notes.map(note =>{
        if(note.folderId === notesID){
            return (
            <div style={notediv1}>
                <h3 style={notetitle}>{note.name}</h3>
                <p style={notecontent}>{note.content}</p>
            </div>
            ) 
        }
    })
    return (
        <div style={notediv}>
            {note} 
        </div>
    )
}


const notediv={
    borderStyle: 'solid',
    borderColor: 'yellow',
    width:'55%',
    float:'right'

   

}
const notediv1={

}

const notetitle={
    color:'red'

}

const notecontent={

}