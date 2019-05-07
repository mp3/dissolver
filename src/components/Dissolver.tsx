import * as React from 'react'
import styled from 'styled-components'

export default () => {
  const [image, setImage] = React.useState(null)
  const [isDragover, setDragover] = React.useState(false)

  const fileReader = new FileReader()
  fileReader.onload = (event: any) => {
    const result = event.target.result
    setImage(result)
  }

  const checkDraggedFile = (event: React.DragEvent) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    Array.from(files).forEach(file => {
      if (file.type.includes('image/')) {
        fileReader.readAsDataURL(file)
      }
    })
  }

  const dragover = () => {
    setDragover(true)
  }

  const dragleave = () => {
    setDragover(false)
  }

  return (
    <Container>
      <Image src={image || ''} />
      <DraggableArea
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
`

const Image = styled.img``

const DraggableArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;

  &[data-dragover='true'] {
    background-color: #ccc;
  }
`
