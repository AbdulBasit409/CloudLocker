import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getFiles } from './api/getFiles'
import { uploadFile } from './api/uploadFile'
import { deleteFile } from './api/deleteFile'

interface Upload {
  _id: string;
  filename: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [file, setFile] = useState<File>()
  const [uploads, setUploads] = useState<Upload[]>([])
  const fileRef = useRef(null)

  function handleChange(event: any) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event: any) {
    event.preventDefault()
    try {
      const newFile = await uploadFile(file)
      setUploads([...uploads, newFile])
      setFile(undefined);
      // @ts-expect-error
      fileRef.current.value = null
    }
    catch(error) {
      console.error(error)
    }
  }

  async function handleDelete(event: any) {
    const _id = event.target.getAttribute("data-_id")
    try {
      const res = await deleteFile(_id)
      console.log(res)
    }
    catch(error) {
      console.error(error)
    }
    const files = await getFiles()
    setUploads(files)
  }

  useEffect(() => {
    getFiles()
      .then(files => {
        setUploads(files)
        // set auth true if get files success
        setIsAuthenticated(true)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="App">
      {
        !isAuthenticated ?
          <a href="http://localhost:5000/auth/google">Login</a>
          :
          <>
            <form onSubmit={handleSubmit}>
              <label htmlFor="file">File</label>
              <input id="file" type="file" onChange={handleChange} ref={fileRef}></input>
              <button type="submit">Upload</button>
            </form>
            {
              uploads.map(upload => (
                <div key={upload._id} className="upload">
                  <a href={`http://localhost:5000/files/${upload.filename}`} download>{upload.filename}</a>
                  <span className="del" data-_id={upload._id} onClick={handleDelete}>Delete</span>
                </div>
              ))
            }
          </>
      }
    </div>
  )
}

export default App
