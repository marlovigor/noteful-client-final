import React from 'react'

export default function folderprops(props) {
    return (
        <div style={folderDiv}>
            <h1 style={folderStyle}>{props.foldername}</h1>
        </div>
    )
}

const folderDiv={
    width:"44%"

}

const folderStyle={
    color:'brown',
    fontSize:'2em'

}