'use client'

import Link from 'next/link'

export function Enivid(): React.ReactElement {
  return (
    <>
      <Link href={'/enivid/elbib'}>
        <button>Elbib</button>
      </Link>
      <Link href={'/enivid/naruq'}>
        <button>Naruq</button>
      </Link>
    </>
  )
}
