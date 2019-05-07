import * as React from 'react'
import styled from 'styled-components'

export default () => {
  const [image, setImage] = React.useState(null)

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

  return (
    <Container>
      <Image src={image || ''} />
      <DraggableArea onDragOver={checkDraggedFile} onDrop={checkDraggedFile} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img``

const DraggableArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
