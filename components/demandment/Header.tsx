import React from 'react'
import Link from 'next/link'

export function Header(): React.ReactNode {
  return (
    <header>
      <Link href="/demandment">
        <h1>木水一日弓木一水弓廿</h1>
      </Link>
      丹 <Link href="/">日中戈金水</Link>
    </header>
  )
}
