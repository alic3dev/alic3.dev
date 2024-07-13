import type { Project as ProjectData } from '@/data/projects'

import React from 'react'

import { Section } from '@/components/sections/Section'
import { Project } from '@/components/Project'

import { projects } from '@/data/projects'

import styles from '@/components/sections/ProjectsSection.module.scss'

export function ProjectsSection(): JSX.Element {
  return (
    <Section name="projects" className={styles.section}>
      <div className={styles['section-header']}>
        <h2>Projects</h2>
      </div>

      <div className={styles.projects}>
        {projects.map(
          (project: ProjectData): React.ReactNode => (
            <Project key={project.title} {...project} />
          ),
        )}
      </div>
    </Section>
  )
}
