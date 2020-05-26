import React from 'react';
import Store from '/Users/Jones/notfulappfull/src/Store';
import {useParams} from "react-router-dom"

export default function Notes() {
    const {notesID} = useParams();
    const note = Store.notes.map(note =>{
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