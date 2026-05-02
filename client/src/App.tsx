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
  const [fileName, setFileName] = useState('Choose a file...')
  const fileRef = useRef(null)

  function handleChange(event: any) {
    const selected = event.target.files[0]
    setFile(selected)
    setFileName(selected ? selected.name : 'Choose a file...')
  }

  async function handleSubmit(event: any) {
    event.preventDefault()
    try {
      const newFile = await uploadFile(file)
      setUploads([...uploads, newFile])
      setFile(undefined)
      setFileName('Choose a file...')
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
      await deleteFile(_id)
    }
    catch(error) {
      console.error(error)
    }
    const files = await getFiles()
    setUploads(files)
  }

  async function handleLogout() {
    await fetch("http://localhost:5000/auth/logout", {
      credentials: "include"
    })
    setIsAuthenticated(false)
    setUploads([])
  }

  useEffect(() => {
    getFiles()
      .then(files => {
        setUploads(files)
        setIsAuthenticated(true)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div className="login-container">
          <div className="login-logo">CloudLocker</div>
          <p className="login-subtitle">Your personal cloud storage</p>
          <a href="http://localhost:5000/auth/google" className="login-btn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
        </div>
      ) : (
        <div className="app-container">
          <div className="app-header">
            <h1 className="app-title">CloudLocker</h1>
            <button className="logout-btn" onClick={handleLogout}>Sign out</button>
          </div>

          <div className="upload-card">
            <form className="upload-form" onSubmit={handleSubmit}>
              <label className="file-input-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                {fileName}
                <input id="file" type="file" onChange={handleChange} ref={fileRef} />
              </label>
              <button type="submit" className="upload-btn">Upload</button>
            </form>
          </div>

          <div className="files-section">
            <span className="files-label">Your files</span>
            <div className="files-list">
              {uploads.length === 0 ? (
                <div className="empty-state">No files uploaded yet</div>
              ) : (
                uploads.map(upload => (
                  <div key={upload._id} className="upload">
                    <a href={`http://localhost:5000/files/${upload.filename}`} download>
                      {upload.filename}
                    </a>
                    <span className="del" data-_id={upload._id} onClick={handleDelete}>
                      Delete
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
