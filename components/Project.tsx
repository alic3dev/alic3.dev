import React from 'react'

import type { Project } from '@/data/projects'

import { LinksWithIcons } from './LinksWithIcons'

import styles from './Project.module.scss'

export function Project({
  title,
  links = {},
  description,
  visual,
}: Project): JSX.Element {
  return (
    <article className={styles.project}>
      <div className={styles.info}>
        <div>
          <h3 className={styles['project-title']}>{title}</h3>

          <LinksWithIcons links={links} />
        </div>

        {Array.isArray(description) ? (
          description.map((descriptionElement) =>
            descriptionElement.type ? (
              <div key={descriptionElement.key} className={styles.description}>
                {descriptionElement}
              </div>
            ) : (
              <p key={descriptionElement.key} className={styles.description}>
                {descriptionElement}
              </p>
            ),
          )
        ) : (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      <figure className={styles.visualization}>{visual}</figure>
    </article>
  )
}
