
import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Converter from './Converter'

function DragnDrop() {
    const[files,setFiles]=useState([])
    const nishil = (e) =>{
      console.log(files)
    }
  const{getRootProps,getInputProps}=useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles)=>{
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
      )
      )
    },
    
  })
  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))
  console.log(files[0],"Nish")
    return (
        <div className='App'>
            <div {...getRootProps()}>
          <input {...getInputProps()} style={{border:"2px solid red"}}/>
          <p>Drag 'n' Drop files</p>
          </div>
          <div>{images}</div>
          <Converter data={files[0]}></Converter>
        </div>
    
      );
}

export default DragnDrop