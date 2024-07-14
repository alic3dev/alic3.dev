import type { TechnologyName } from '@/components/decorative/TechnologyIcon'

import React from 'react'

import { HoverableHR } from '@/components/HoverableHR'
import { TechnologyIcon } from '@/components/decorative/TechnologyIcon'

import styles from '@/components/TechnologyList.module.scss'

export function TechnologyList({
  technologies,
  noHR = false,
}: {
  technologies: TechnologyName[]
  noHR?: boolean
}): React.ReactNode {
  const technologyIcons: React.ReactNode[] = React.useMemo<React.ReactNode[]>(
    (): React.ReactNode[] =>
      technologies.map(
        (technology: TechnologyName): React.ReactNode => (
          <TechnologyIcon key={technology} technology={technology} />
        ),
      ),
    [technologies],
  )

  if (noHR) {
    return <div className={styles.list}>{technologyIcons}</div>
  }

  return <HoverableHR title="stack | tech">{technologyIcons}</HoverableHR>
}
