export async function getFiles() {
    // include credentials: send and set cookies in CORS
    const res = await fetch("/files", { credentials: "include" })
    return res.json()
}