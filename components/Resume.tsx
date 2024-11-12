'use client'

import type {
  WorkHistoryCompany,
  WorkHistoryPosition,
} from '@/data/workHistory.types'

import React from 'react'
import dynamic from 'next/dynamic'

import {
  PDFViewer,
  Font,
  Document,
  Page,
  Text,
  View,
  Link,
} from '@react-pdf/renderer'

import { personalInfo } from '@/data/personalInfo'
import {
  jobHistory,
  educationHistory,
  skills,
  experienceSummaries,
} from '@/data/workHistory'

import { icons } from '@/utils/resumeIcons'
import { styles } from '@/styles/resumeStyles'

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

const SkillView = ({ skill }: { skill: string }): React.ReactElement => (
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
}): React.ReactElement => (
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
}): React.ReactElement => {
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
}): React.ReactElement => (
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
}): React.ReactElement => (
  <View>
    {education.positions.map(
      (position: WorkHistoryPosition): React.ReactElement => (
        <EducationPositionView
          key={position.name}
          education={education}
          position={position}
        />
      ),
    )}
  </View>
)

const professionalExperience: WorkHistoryCompany[] = [...jobHistory].sort(
  (a: WorkHistoryCompany, b: WorkHistoryCompany): number =>
    b.startDate.valueOf() - a.startDate.valueOf(),
)

export function Resume(): React.ReactElement {
  return React.useMemo<React.ReactElement>(
    (): React.ReactElement => (
      <PDFViewer
        height="100%"
        width="100%"
        style={{ border: 'none', height: '100vh' }}
      >
        <Document
          language="en"
          author={personalInfo.name}
          subject={`${personalInfo.title} Resume`}
          title={`${personalInfo.name} - Resume`}
          keywords="Contact 'Work Experience' Education Skills"
          pageLayout="singlePage"
        >
          <Page size="A4" wrap={true} style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.headerName}>{personalInfo.name}</Text>
              <Text style={styles.headerTitle}>{personalInfo.title}</Text>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.mainContent}>
                <Text style={[styles.heading, styles.experience]}>Summary</Text>

                <Text style={styles.summary}>
                  {experienceSummaries.condensed}
                </Text>

                <Text style={[styles.heading, styles.experience]}>
                  Professional Experience
                </Text>
                {professionalExperience.map(
                  (company: WorkHistoryCompany): React.ReactElement => (
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
                      {personalInfo.contact.email}
                    </Text>
                  </View>

                  <View style={styles.textContainer}>
                    {icons.phone}
                    <Text style={styles.sideContentText}>
                      {personalInfo.contact.phone}
                    </Text>
                  </View>

                  <View style={styles.textContainer}>
                    {icons.location}
                    <Text style={styles.sideContentText}>
                      {personalInfo.location}
                    </Text>
                  </View>

                  <View style={styles.textContainer}>
                    {icons.browser}
                    <Link
                      style={[styles.sideContentText, styles.link]}
                      src={personalInfo.links.portfolio.href}
                    >
                      {personalInfo.links.portfolio.name ||
                        personalInfo.links.portfolio.href}
                    </Link>
                  </View>

                  <View style={styles.textContainer}>
                    {icons.github}
                    <Link
                      style={[styles.sideContentText, styles.link]}
                      src={personalInfo.links.github.href}
                    >
                      {personalInfo.links.github.name ||
                        personalInfo.links.github.href}
                    </Link>
                  </View>
                </View>

                <View style={styles.contentSection}>
                  <Text style={styles.heading}>Skills</Text>

                  <Text style={styles.subHeadingCompact}>Languages</Text>
                  {skills.languages.map(
                    (language: string): React.ReactElement => (
                      <SkillView key={language} skill={language} />
                    ),
                  )}

                  <Text style={styles.subHeading}>Libraries/Frameworks</Text>
                  {skills.librariesAndFrameworks.map(
                    (libraryOrFramework: string): React.ReactElement => (
                      <SkillView
                        key={libraryOrFramework}
                        skill={libraryOrFramework}
                      />
                    ),
                  )}

                  <Text style={styles.subHeading}>Development Software</Text>
                  {skills.software.map(
                    (software: string): React.ReactElement => (
                      <SkillView key={software} skill={software} />
                    ),
                  )}
                </View>

                <View style={styles.contentSection}>
                  <Text style={styles.heading}>Education</Text>
                  {educationHistory.map(
                    (education: WorkHistoryCompany): React.ReactElement => (
                      <EducationView
                        key={education.name}
                        education={education}
                      />
                    ),
                  )}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    ),
    [],
  )
}

export const ResumeDynamic = dynamic(() => Promise.resolve(Resume), {
  ssr: false,
})
