'use client'

import styles from '@/components/sections/Section.module.scss'

export default function Section({
  name,
  className,
  containerClassName,
  children,
}: React.PropsWithChildren<{
  name: Pages.ValidLocation
  className?: string
  containerClassName?: string
}>): JSX.Element {
  return (
    <section
      id={name !== 'home' ? name : undefined}
      className={`${styles.section} ${className || ''}`}
    >
      <div
        className={`${styles['section-container']} ${containerClassName || ''}`}
      >
        {children}
      </div>
    </section>
  )
}
