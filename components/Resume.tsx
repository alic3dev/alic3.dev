'use client'

import type { ResumeInfo, PDFViewerType } from '@/components/Resume.types'
import type {
  WorkHistoryCompany,
  WorkHistoryPosition,
} from '@/data/workHistory.types'

import React from 'react'
import dynamic from 'next/dynamic'

import { Font, Document, Page, Text, View, Link } from '@react-pdf/renderer'

import {
  jobHistory,
  educationHistory,
  skills,
  freelancingHistory,
} from '@/data/workHistory'

import { icons } from '@/utils/resumeIcons'
import { styles } from '@/styles/resumeStyles'

const resumeInfo: ResumeInfo = {
  name: 'Alice Grace',
  title: 'Full Stack Developer',
  location: 'Fork Union, VA',
  contact: {
    email: 'alice@alic3.dev',
    phone: '+1 (434) 207-1336',
  },
  links: {
    github: {
      href: 'https://github.com/alic3dev',
      name: 'github.com/alic3dev',
    },
    portfolio: {
      href: 'https://alic3.dev',
      name: 'alic3.dev',
    },
  },
}

const PDFViewer: PDFViewerType = dynamic<PDFViewerType>(
  (): PDFViewerType =>
    import('@react-pdf/renderer').then<PDFViewerType>(
      (mod: { PDFViewer: PDFViewerType }): PDFViewerType => mod.PDFViewer,
    ),
  {
    ssr: false,

    loading: (): React.ReactElement => {
      return (
        <h1
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          Rendering...
        </h1>
      )
    },
  },
)

const hyphenationCallback = (word: string): string[] => [word]
Font.registerHyphenationCallback(hyphenationCallback)
Font.register({
  family: 'NotoSans-Regular',
  src: '/fonts/NotoSans-Regular.ttf',
})
Font.register({
  family: 'NotoSans-Bold',
  src: '/fonts/NotoSans-Bold.ttf',
})

const SkillView = ({ skill }: { skill: string }): JSX.Element => (
  <View style={styles.textContainer}>
    {icons[skill.toLowerCase()]}
    <Text style={styles.skillsText}>{skill}</Text>
  </View>
)

const CompanyPositionView = ({
  position,
  company,
  isLast,
}: {
  position: WorkHistoryPosition
  company: WorkHistoryCompany
  isLast: boolean
}): JSX.Element => (
  <View style={isLast ? styles.companyPositionLast : styles.companyPosition}>
    <View style={styles.companyPositionInfo}>
      <Text style={styles.companyPositionName}>{position.name}</Text>
      <Text style={styles.companyPositionLength}>
        {position.detailedLength}
      </Text>
    </View>
    <View style={styles.companyInfo}>
      <Text style={styles.companyName}>{company.name}</Text>
      <Text style={styles.companyPositionLocation}>{position.location}</Text>
    </View>
    <View style={styles.companyPositionDescription}>
      {position.description.map((value) => (
        <View key={value} style={styles.textContainerPosition}>
          {icons.point}
          <Text>{value}</Text>
        </View>
      ))}
    </View>
  </View>
)

const CompanyView = ({
  company,
}: {
  company: WorkHistoryCompany
}): JSX.Element => {
  return (
    <View style={styles.company}>
      {company.positions.map((position, index) => (
        <CompanyPositionView
          key={position.name}
          position={position}
          company={company}
          isLast={index + 1 === company.positions.length}
        />
      ))}
    </View>
  )
}

const EducationPositionView = ({
  education,
  position,
}: {
  education: WorkHistoryCompany
  position: WorkHistoryPosition
}): JSX.Element => (
  <View key={position.name} style={styles.companyPosition}>
    <Text style={styles.educationShortName}>{position.shortName}</Text>
    <Text style={styles.educationName}>{education.name}</Text>
    <Text style={styles.educationPositionLength}>
      {position.detailedLength}
    </Text>
  </View>
)

const EducationView = ({
  education,
}: {
  education: WorkHistoryCompany
}): JSX.Element => (
  <View>
    {education.positions.map(
      (position: WorkHistoryPosition): JSX.Element => (
        <EducationPositionView
          key={position.name}
          education={education}
          position={position}
        />
      ),
    )}
  </View>
)

const professionalExperience: WorkHistoryCompany[] = [
  ...jobHistory,
  ...freelancingHistory,
].sort(
  (a: WorkHistoryCompany, b: WorkHistoryCompany): number =>
    b.startDate.valueOf() - a.startDate.valueOf(),
)

export function Resume(): JSX.Element {
  return (
    <PDFViewer
      height="100%"
      width="100%"
      style={{ border: 'none', height: '100vh' }}
    >
      <Document
        language="en"
        author={resumeInfo.name}
        subject={`${resumeInfo.title} Resume`}
        title={`${resumeInfo.name} - Resume`}
        keywords="Contact 'Work Experience' Education Skills"
        pageLayout="singlePage"
      >
        <Page size="A4" wrap={true} style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.headerName}>{resumeInfo.name}</Text>
            <Text style={styles.headerTitle}>{resumeInfo.title}</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.mainContent}>
              <Text style={[styles.heading, styles.experience]}>
                Professional Experience
              </Text>
              {professionalExperience.map(
                (company: WorkHistoryCompany): JSX.Element => (
                  <CompanyView key={company.name} company={company} />
                ),
              )}
            </View>

            <View style={styles.sideContent}>
              <View style={styles.contentSection}>
                <Text style={styles.heading}>Contact</Text>

                <View style={styles.textContainer}>
                  {icons.email}
                  <Text style={styles.sideContentText}>
                    {resumeInfo.contact.email}
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  {icons.phone}
                  <Text style={styles.sideContentText}>
                    {resumeInfo.contact.phone}
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  {icons.location}
                  <Text style={styles.sideContentText}>
                    {resumeInfo.location}
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  {icons.browser}
                  <Link
                    style={[styles.sideContentText, styles.link]}
                    src={resumeInfo.links.portfolio.href}
                  >
                    {resumeInfo.links.portfolio.name ||
                      resumeInfo.links.portfolio.href}
                  </Link>
                </View>

                <View style={styles.textContainer}>
                  {icons.github}
                  <Link
                    style={[styles.sideContentText, styles.link]}
                    src={resumeInfo.links.github.href}
                  >
                    {resumeInfo.links.github.name ||
                      resumeInfo.links.github.href}
                  </Link>
                </View>
              </View>

              <View style={styles.contentSection}>
                <Text style={styles.heading}>Skills</Text>

                <Text style={styles.subHeadingCompact}>Languages</Text>
                {skills.languages.map(
                  (language: string): JSX.Element => (
                    <SkillView key={language} skill={language} />
                  ),
                )}

                <Text style={styles.subHeading}>Libraries/Frameworks</Text>
                {skills.librariesAndFrameworks.map(
                  (libraryOrFramework: string): JSX.Element => (
                    <SkillView
                      key={libraryOrFramework}
                      skill={libraryOrFramework}
                    />
                  ),
                )}

                <Text style={styles.subHeading}>Development Software</Text>
                {skills.software.map(
                  (software: string): JSX.Element => (
                    <SkillView key={software} skill={software} />
                  ),
                )}
              </View>

              <View style={styles.contentSection}>
                <Text style={styles.heading}>Education</Text>
                {educationHistory.map(
                  (education: WorkHistoryCompany): JSX.Element => (
                    <EducationView key={education.name} education={education} />
                  ),
                )}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}
