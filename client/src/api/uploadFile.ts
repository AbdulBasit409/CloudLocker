export async function uploadFile(file: any) {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("http://localhost:5000/files", {
        method: "POST",
        body: formData,
        credentials: "include",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    })
    return res.json()
}