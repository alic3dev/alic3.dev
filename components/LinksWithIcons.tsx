import React from 'react'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

import styles from './LinksWithIcons.module.scss'

export interface Links {
  external?: string
  github?: string
}

export function LinksWithIcons({ links }: { links?: Links }): React.ReactNode {
  return (
    <>
      {links && (
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
      )}
    </>
  )
}
