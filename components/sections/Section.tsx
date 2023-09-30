'use client'

import { ValidLocation } from '@/utils/validLocations'

import styles from './Section.module.scss'

export default function Section({
  name,
  children,
}: React.PropsWithChildren<{ name: ValidLocation }>): JSX.Element {
  return (
    <section id={name} className={styles.section}>
      {children}
    </section>
  )
}
