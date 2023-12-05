import { Button } from '@mui/material'

interface ImageUploadProps {
  id: string
  imageFile: File | null
  setImageFile: (file: File | null) => void
}

export function ImageUpload({ id, imageFile, setImageFile }: ImageUploadProps) {
  return (
    <Button variant="contained" component="label">
      <p>{imageFile?.name || 'click to upload a file'}</p>
      <input
        id={id}
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          setImageFile(file)
        }}
      />
    </Button>
  )
}
