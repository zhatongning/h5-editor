import axios from 'axios'

const DefaultUploadUrl = 'http://127.0.0.1:3000/api/upload'
export const upload = async (url: string = DefaultUploadUrl, file: File | Blob, fileName?: string): Promise<string | undefined> => {
  if (file) {
    const formData = new FormData()
    formData.append((file && file instanceof File) ? file.name : fileName || '', file, fileName)
    try {
      const res: { data: { data: { url: string } } } = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return res?.data?.data?.url
    } catch (e) {
      //
    }
  }
}

