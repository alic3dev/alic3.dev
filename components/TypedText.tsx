import React from 'react'

import styles from '@/components/TypedText.module.scss'

export function TypedText({
  text,
  slow = false,
  rainbow = false,
}: {
  text: string
  slow?: boolean
  rainbow?: boolean
}): React.ReactNode {
  const textNodes = React.useMemo<React.ReactNode[]>(
    (): React.ReactNode[] =>
      text.split('').map(
        (char: string, index: number): React.ReactNode => (
          <span
            key={`${char}${index}`}
            className={`${styles.letter} ${slow ? styles.slow : ''} ${
              rainbow ? styles.rainbow : ''
            }`}
          >
            {char}
          </span>
        ),
      ),
    [text, slow, rainbow],
  )

  return <>{textNodes}</>
}
