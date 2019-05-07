import * as React from 'react'

const Top = React.lazy(() => import('components/pages/Top'))

export default () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Top />
  </React.Suspense>
)
