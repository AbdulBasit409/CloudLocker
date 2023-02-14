export async function deleteFile(_id: string) {
    const res = await fetch(`http://localhost:5000/files/${_id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (res.status === 404) {
        throw new Error("Upload not found")
    }

    return res.json()
}