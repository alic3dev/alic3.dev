import type { TechnologyName } from '@/components/decorative/TechnologyIcon'

import React from 'react'

import { HoverableHR } from '@/components/HoverableHR'
import { TechnologyIcon } from '@/components/decorative/TechnologyIcon'

export function TechnologyList({
  technologies,
}: {
  technologies: TechnologyName[]
}): React.ReactNode {
  return (
    <HoverableHR title="stack | tech">
      {technologies.map(
        (technology: TechnologyName): React.ReactNode => (
          <TechnologyIcon key={technology} technology={technology} />
        ),
      )}
    </HoverableHR>
  )
}
