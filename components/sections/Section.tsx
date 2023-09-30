'use client'

import { ValidLocation } from '@/utils/validLocations'

import styles from './Section.module.scss'

export default function Section({
  name,
  children,
}: React.PropsWithChildren<{ name: ValidLocation }>): JSX.Element {
  return (
    <section id={name !== 'home' ? name : undefined} className={styles.section}>
      <div className={styles['section-container']}>{children}</div>
    </section>
  )
}
