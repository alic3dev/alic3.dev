import React from 'react'

import styles from '@/components/HoverableHR.module.scss'

export function HoverableHR({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>): React.ReactNode {
  return (
    <div className={styles['hoverable-hr']}>
      <div className={styles['hoverable-hr-rule']}>
        {title && (
          <span className={styles['hoverable-hr-rule-title']}>{title}</span>
        )}
      </div>

      {children}
    </div>
  )
}
