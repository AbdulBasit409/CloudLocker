export async function deleteFile(filename: string) {
    const res = await fetch(`http://localhost:5000/files/${filename}`, {
        method: "DELETE",
        credentials: "include",
    })

    return res.json()
}