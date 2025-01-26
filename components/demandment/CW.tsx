import React from 'react'

import styles from '@/components/demandment/CW.module.scss'

type ContentWarning =
  | 'Abuse'
  | 'Beastiality'
  | 'Bondage'
  | 'Child Abuse'
  | 'Child Sexual Abuse'
  | 'Cult abuse'
  | 'Domestic Violence'
  | 'Kidnapping'
  | 'Incest'
  | 'Racism'
  | 'Rape'
  | 'Regligious Trauma'
  | 'Self Harm'
  | 'Sexual Abuse'
  | 'Sexual Assualt'
  | 'Suicide'
  | 'Trauma'
  | 'Torture'
  | 'Xenophobia'

export function CW({
  warnings = [],
}: {
  warnings?: ContentWarning[]
}): React.ReactNode {
  if (!warnings.length) {
    return <></>
  }

  return (
    <div className={styles.cw}>
      <div className={styles.label}>CW</div>

      <ul className={styles.warnings}>
        {warnings.map(
          (warning: ContentWarning, index: number): React.ReactNode => (
            <li key={`${index}: ${warning}`}>
              {index > 0 ? ', ' : ''}
              {warning}
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
