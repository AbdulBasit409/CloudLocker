export async function getFiles() {
    // include credentials (cookies) in CORS
    const res = await fetch("http://localhost:5000/files", { credentials: "include" })
    if (res.status === 401) {
        throw new Error("unauthenticated") 
    }
    return res.json()
}