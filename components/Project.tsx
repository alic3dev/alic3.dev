import type { Project } from '@/data/projects'

import React from 'react'

import { CollapsibleItem } from '@/components/CollapsibleItem'
import { LinksWithIcons } from '@/components/LinksWithIcons'
import { TechnologyList } from '@/components/TechnologyList'

import styles from '@/components/Project.module.scss'

export function Project({
  title,
  links = {},
  description,
  technologies,
  visual,
}: Project): JSX.Element {
  return (
    <CollapsibleItem
      key={title}
      id={`project|${title}`}
      title={title}
      noMargins
    >
      <div className={styles.project}>
        <div className={styles.info}>
          <figure className={styles.visualization}>{visual}</figure>

          <div className={`${styles.links} ${styles.mobile}`}>
            <LinksWithIcons links={links} />
          </div>

          <div className={styles.description}>
            {Array.isArray(description) ? (
              description.map(
                (descriptionElement: JSX.Element): React.ReactNode =>
                  descriptionElement.type ? (
                    <div key={descriptionElement.key}>{descriptionElement}</div>
                  ) : (
                    <p key={descriptionElement.key}>{descriptionElement}</p>
                  ),
              )
            ) : (
              <p>{description}</p>
            )}
          </div>

          <TechnologyList technologies={technologies} />
        </div>
      </div>
    </CollapsibleItem>
  )
}
