import React, { Component } from "react"




export const FolderNoteContext = React.createContext({
    folder:[],
    notes: [],
    addFolder: () => { },
    addNotes: () => { },
    deletNote:() => { }

});


console.log("working")