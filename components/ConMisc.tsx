'use client'

import React from 'react'

let hasRan = false

export function ConMisc(): React.ReactNode {
  React.useEffect((): void => {
    if (hasRan) return

    console.log(`
      ⛤⛧⛤
      ⛧⛤    6<2
      ⛤      ⛧      ⛤

      Lost epiphanies,
      If only to see,
      What is to be,
      In this symphony.
      ___/

      ⛧      ⛤      ⛧
      ⛤⛧    1>2
      ⛧⛤⛧
    `)

    hasRan = true
  }, [])

  return <></>
}
