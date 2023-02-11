import { useState, useEffect, FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getFiles } from './api/getFiles'
import { uploadFile } from './api/uploadFile'

function App() {
  const [file, setFile] = useState<File>()
  const [uploads, setUploads] = useState<any[]>([])

  function handleChange(event: any) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const newFile = await uploadFile(file)
    setUploads([...uploads, newFile])
  }

  useEffect(() => {
    getFiles()
      .then(files => {
        setUploads(files)
      })
  }, [])

  return (
    <div className="App">
      <>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">File</label>
          <input id="file" type="file" onChange={handleChange}></input>
          <button type="submit">Upload</button>
        </form>
        {
          uploads.map(upload => (
            <div id={upload._id}>
              <a href={`/files/${upload.filename}`} download>{upload.filename}</a>
            </div>
          ))
        }
      </>
    </div>
  )
}

export default App
