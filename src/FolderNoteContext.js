import React, { Component } from "react"




export const FolderNoteContext = React.createContext({
    folder:[],
    notes: [],
    addFolder: () => { },
    addNotes: () => { },

});


console.log("working")