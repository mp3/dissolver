import * as React from 'react'

const Dissolver = React.lazy(() => import('components/Dissolver'))

export default () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Dissolver />
  </React.Suspense>
)
