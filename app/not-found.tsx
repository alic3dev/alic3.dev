import React from 'react'
import Link from 'next/link'

import { IoIosAlert } from 'react-icons/io'

import { Footer, Header } from '@/components'

import { NoPageScroll } from '@/utils/useNoPageScroll'

import styles from '@/app/not-found.module.scss'

export default function NotFound(): React.ReactNode {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <IoIosAlert className={styles.icon} />

        <h1>404: Not Found</h1>

        <p className={styles.content}>Could not find requested resource</p>

        <Link href="/">Home</Link>
      </div>

      <Header minimal noBg />
      <Footer noBg />

      <NoPageScroll />
    </main>
  )
}
