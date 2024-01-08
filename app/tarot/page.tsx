import React from 'react'
import type { Metadata } from 'next'

import { Tarot } from '@/components/Tarot'
import Title from '@/components/Header/Title'

import styles from './page.module.scss'

export const metadata: Metadata = {
  title: '🂡🂱🃁🃑',
  description: '🂡🂱🃁🃑T0🂡🂱🃁🃑R🂡🂱🃁🃑4T🂡🂱🃁🃑',
}

export default function TarotPage(): JSX.Element {
  return (
    <main>
      <Tarot />

      <div className={styles['title-wrapper']}>
        <Title />
      </div>
    </main>
  )
}
