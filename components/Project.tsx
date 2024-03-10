import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

import Link from 'next/link'

import styles from './Project.module.scss'

export function Project({
  title,
  links = {},
  description,
  visual,
}: {
  title: string
  links?: {
    external?: string
    github?: string
  }
  description: JSX.Element | JSX.Element[]
  visual: JSX.Element
}): JSX.Element {
  return (
    <article className={styles.project}>
      <div className={styles.info}>
        <div>
          <h3 className={styles['project-title']}>{title}</h3>

          <nav className={styles.links}>
            {links.external && links.external.startsWith('/') ? (
              <Link href={links.external} aria-label="Open">
                <FaExternalLinkAlt aria-label="Open" />
              </Link>
            ) : (
              <a href={links.external}>
                <FaExternalLinkAlt aria-label="Open" />
              </a>
            )}
            {links.github && (
              <a href={links.github}>
                <FaGithub alria-label="Github" />
              </a>
            )}
          </nav>
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
