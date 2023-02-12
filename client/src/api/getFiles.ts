export async function getFiles() {
    // include credentials: send and set cookies in CORS
    const res = await fetch("http://localhost:5000/files", { credentials: "include" })
    return res.json()
}