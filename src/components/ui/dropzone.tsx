import React, { useEffect, useState, CSSProperties } from 'react'
import { useDropzone } from 'react-dropzone'
import { Text, Box } from 'rebass'

interface FileWithPreview extends File {
    preview: string;
}

const thumbsContainer: CSSProperties = {
  minHeight: 160,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb: CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner: CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img: CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

export type TDropzoneHandles = {
    upload: () => Promise<void>;
    isEmpty: boolean;
}

type TProps = {
    onFilesChange: (files: File[]) => void;
}

export function Dropzone ({ onFilesChange }: TProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpg, image/jpeg, image/gif, image/tif, image/svg',
    onDrop: acceptedFiles => {
      const filesData = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))

      setFiles(filesData)
      onFilesChange(filesData)
    }
  })

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt={file.preview}
          style={img}
        />
      </div>
    </div>
  ))

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  return (
    <section>
      <Box
        {...getRootProps()}
        p={7}
        sx={{
          border: 'dashed 1px'
        }}
      >
        <input {...getInputProps()} />
        <Text fontSize={1}>Drag 'n' drop some files here, or click to select files</Text>
      </Box>
      <aside style={thumbsContainer}>
        {files.length > 0 ? thumbs : <Text fontSize={1} textAlign='center' width={1} mt={10}>No files selected...</Text>}
      </aside>
    </section>
  )
}
