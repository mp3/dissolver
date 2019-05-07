import Compressor from 'compressorjs'
import * as React from 'react'
import styled from 'styled-components'

const compressRound = 250

export default () => {
  const [imageBlob, setImageBlob] = React.useState(new Blob())
  const [imageURL, setImageURL] = React.useState('')
  const [count, setCount] = React.useState(0)
  const [isDragover, setDragover] = React.useState(false)
  const inputElement = React.useRef<HTMLInputElement>(null)

  const fileReader = new FileReader()

  React.useEffect(() => {
    if (count > 0 && imageBlob.size) {
      compress(imageBlob)
    }
  })

  fileReader.onload = (event: any) => {
    const result = event.target.result
    setImageURL(result)

    if (count < compressRound) {
      setCount(count + 1)
    } else {
      // download()
    }

    setCount(0)
  }

  // const download = () => {
  //   const url = window.URL.createObjectURL(imageBlob)
  //   const a = document.createElement('a')
  //   a.download = url
  //   a.href = url
  //   a.dispatchEvent(new MouseEvent('click'))
  // }

  const compress = (file: File | Blob) => {
    const q = 1 - count / compressRound
    new Compressor(file, {
      convertSize: 0,
      maxHeight: 1000,
      maxWidth: 1000,
      quality: q,
      success(result) {
        setImageBlob(result)
        fileReader.readAsDataURL(result)
      },
      error(error) {
        console.error(error)
      }
    })
  }

  const checkDraggedFile = (event: React.DragEvent) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    Array.from(files).forEach(file => {
      if (file.type.includes('image/')) {
        compress(file)
      }
    })
  }

  const dragover = () => {
    setDragover(true)
  }

  const dragleave = () => {
    setDragover(false)
  }

  const checkInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = event.target.files
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.includes('image/')) {
          compress(file)
        }
      })
    }
  }

  const openFileSelector = () => {
    const current = inputElement.current
    if (current) {
      current.click()
    }
  }

  return (
    <Container>
      {imageURL ? null : <Message>{'Drop or Select image file here'}</Message>}
      <Input
        ref={inputElement}
        type="file"
        accept="image/*"
        onChange={checkInputFile}
      />
      <Image src={imageURL || ''} />
      <DraggableArea
        onClick={openFileSelector}
        onDragOver={event => {
          checkDraggedFile(event)
          dragover()
        }}
        onDrop={event => {
          checkDraggedFile(event)
          dragleave()
        }}
        onDragLeave={dragleave}
        data-dragover={isDragover}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`

const Input = styled.input`
  display: none;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`

const Message = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 40px;
  margin: auto;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  font-family: sans-serif;
  color: #fff;
`

const DraggableArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;

  &[data-dragover='true'] {
    background-color: rgba(150, 150, 150, 0.5);
  }
`
