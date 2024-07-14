import React from 'react'

import styles from '@/components/HoverableHR.module.scss'

export function HoverableHR({
  title,
  always = false,
  children,
}: React.PropsWithChildren<{
  title: string
  always?: boolean
}>): React.ReactNode {
  return (
    <div
      className={`${styles['hoverable-hr']} ${always ? styles['always'] : ''}`}
    >
      <div className={styles['hoverable-hr-rule']}>
        {title && (
          <span className={styles['hoverable-hr-rule-title']}>{title}</span>
        )}
      </div>

      {children}
    </div>
  )
}
