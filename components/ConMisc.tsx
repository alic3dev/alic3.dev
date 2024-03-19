'use client'

import React from 'react'

let hasRan = false

export function ConMisc(): React.ReactNode {
  React.useEffect((): void => {
    if (hasRan) return

    console.log(`
      ⛤⛧⛤
      ⛧⛤    602
      ⛤      ⛧      ⛤

      Lost epiphanies,
      If only to see,
      What is to be,
      In this symphony.
      ...🖊️

      ⛧      ⛤      ⛧
      ⛤⛧    172
      ⛧⛤⛧
    `)

    hasRan = true
  }, [])

  return <></>
}
