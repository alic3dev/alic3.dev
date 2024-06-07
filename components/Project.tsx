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
      subTitle={<LinksWithIcons links={links} />}
    >
      <div className={styles.project}>
        <figure className={`${styles.visualization} ${styles.desktop}`}>
          {visual}
        </figure>

        <div className={styles.info}>
          <figure className={`${styles.visualization} ${styles.mobile}`}>
            {visual}
          </figure>

          <div className={styles.description}></div>
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

          <TechnologyList technologies={technologies} />
        </div>
      </div>
    </CollapsibleItem>
  )
}
