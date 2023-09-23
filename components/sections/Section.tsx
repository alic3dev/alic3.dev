'use client'

import { ValidLocation } from '@/utils/validLocations'

import styles from './Section.module.scss'

export const Section: React.FC<
  React.PropsWithChildren<{ name: ValidLocation }>
> = ({ name, children }): JSX.Element => {
  return (
    <section id={name} className={styles.section}>
      {children}
    </section>
  )
}

export default Section
