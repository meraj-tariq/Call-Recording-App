import React, { useState, useEffect, Suspense } from 'react'
import Spinner from './@core/components/spinner/Fallback-spinner'
// ** Router Import
import Router from './router/Router'

// ** Routes & Default Routes
import { getRoutes } from './router/routes'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

const App = () => {
  const [allRoutes, setAllRoutes] = useState([])

  // ** Hooks
  const { layout } = useLayout()

  useEffect(() => {
    setAllRoutes(getRoutes(layout))
  }, [layout])
  return (
    <Suspense fallback={<Spinner />}>
      <Router allRoutes={allRoutes} />
    </Suspense>
  )
}

export default App
