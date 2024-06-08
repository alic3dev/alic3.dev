import React from 'react'
import Link from 'next/link'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

import styles from '@/components/LinksWithIcons.module.scss'

export interface Links {
  external?: string
  github?: string
}

export function LinksWithIcons({ links }: { links: Links }): React.ReactNode {
  return (
    <nav className={styles.links}>
      {links.external && links.external.startsWith('/') ? (
        <Link href={links.external} aria-label="Open" title="Open">
          <FaExternalLinkAlt aria-label="Open" />
        </Link>
      ) : (
        <a href={links.external} aria-label="Open" title="Open">
          <FaExternalLinkAlt aria-label="Open" />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          aria-label="Github Repository"
          title="Github Repository"
        >
          <FaGithub aria-label="Github Repository" />
        </a>
      )}
    </nav>
  )
}
