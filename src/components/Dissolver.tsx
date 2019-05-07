import * as React from 'react'
import styled from 'styled-components'

export default () => {
  return (
    <Container>
      <DraggableArea />
    </Container>
  )
}

const Container = styled.div`
  padding: 10px;
  text-align: center;
`

const DraggableArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
