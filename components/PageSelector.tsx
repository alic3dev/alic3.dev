'use client'

import React from 'react'

import styles from '@/components/PageSelector.module.scss'

export function PageSelector({
  defaultValue,
  maxValue,
  baseURL,
}: {
  defaultValue: number
  maxValue: number
  baseURL?: string
}): React.ReactElement {
  const [selectedValue, setSelectedValue] = React.useState<number>(defaultValue)

  return (
    <div className={styles['page-selector']}>
      <input
        className={styles['selected-input']}
        type="number"
        min={1}
        max={maxValue}
        value={selectedValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          if (
            isNaN(event.currentTarget.valueAsNumber) ||
            event.currentTarget.valueAsNumber <= 0
          ) {
            setSelectedValue(1)
          } else if (event.currentTarget.valueAsNumber > maxValue) {
            setSelectedValue(maxValue)
          } else {
            setSelectedValue(event.target.valueAsNumber)
          }
        }}
      />
      &nbsp;/ {maxValue}
      {baseURL ? (
        <>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href={`/${baseURL}/${selectedValue}`}>Go</a>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
