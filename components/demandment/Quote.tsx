import React from 'react'

import styles from '@/components/demandment/Quote.module.scss'

export function Quote({
  content,
}: {
  content?: React.ReactNode
}): React.ReactNode {
  return (
    <h3 className={styles.quote}>
      <span className={styles.content}>
        {content ?? true ? (
          <>
            田竹日廿㐪日口水 口水日木戈 弓土户日尸 心水金戈日廿戈 人弓，日
            蓤，日中人尸廿--，。。。
          </>
        ) : (
          <>
            &ldquo;What you are reading is a specication, a time, a lost--,
            ...&rdquo;
          </>
        )}
      </span>
    </h3>
  )
}
