export async function uploadFile(file: any) {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("http://localhost:5000/files", {
        method: "POST",
        body: formData,
        credentials: "include", // include credentials (cookies) in CORS
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    })
    if (res.status === 400) {
        throw new Error("Bad Request")
    }
    return res.json()
}