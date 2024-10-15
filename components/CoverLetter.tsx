'use client'

import type { CoverLetterParameters } from '@/reducers/coverLetterParametersReducer.types'

import React from 'react'
import {
  PDFViewer,
  Font,
  Document,
  Page,
  Text,
  View,
} from '@react-pdf/renderer'

import { personalInfo } from '@/data/personalInfo'

import { hyphenationCallbacks } from '@/utils/reactPDFUtils'

import { styles } from '@/styles/resumeStyles'

Font.registerHyphenationCallback(hyphenationCallbacks.preventSplitting)
Font.register({
  family: 'NotoSans-Regular',
  src: '/fonts/NotoSans-Regular.ttf',
})
Font.register({
  family: 'NotoSans-Bold',
  src: '/fonts/NotoSans-Bold.ttf',
})

export function CoverLetter({
  coverLetterParameters,
}: {
  coverLetterParameters: CoverLetterParameters
}): React.ReactElement {
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
          <Page size="A4" wrap={true} style={styles.coverLetterPage}>
            <View style={styles.header}>
              <Text style={styles.headerName}>{personalInfo.name}</Text>
              <Text style={styles.headerTitle}>{personalInfo.title}</Text>
            </View>

            <View style={styles.personalInfo}>
              <Text>
                {coverLetterParameters.date.toLocaleDateString('en-US')}
              </Text>
              <Text>&nbsp;</Text>
              <Text>{personalInfo.name}</Text>
              <Text>Fork Union, VA</Text>
              <Text>{personalInfo.contact.email}</Text>
              <Text>{personalInfo.contact.phone}</Text>
            </View>

            {/* <View style={styles.personalInfo}>
        <Text>{coverLetterParameters.employersName}</Text>
        <Text>{coverLetterParameters.companyName}</Text>
        <Text>{coverLetterParameters.companyAddress}</Text>
      </View> */}

            <View style={styles.coverLetterOpening}>
              <Text>Dear {coverLetterParameters.employersName},</Text>
            </View>

            <View style={styles.coverLetterParagraph}>
              <Text>
                I am writing to express my interest in the{' '}
                {coverLetterParameters.jobTitle} position at{' '}
                {coverLetterParameters.companyName}. With a robust background in
                both front-end and back-end development, and a demonstrated
                ability to deliver high-quality, scalable web applications, I am
                confident in my ability to contribute effectively to your team.
              </Text>
            </View>

            <View style={styles.coverLetterParagraph}>
              <Text>
                My professional journey as a Full Stack Developer has been
                enriched by diverse experiences, including my role at The Humane
                League, where I enhanced developer experience by maintaining
                configurations for linting, formatting, and typings. I have
                built components and pages using TypeScript, React, and JSX, and
                have created and maintained Contentful CMS components,
                significantly improving donation processes and analytic systems.
              </Text>
            </View>

            <View style={styles.coverLetterParagraph}>
              <Text>
                In my previous role at Osmosis - Knowledge Diffusion, I was
                involved in the development and maintenance of backend REST APIs
                and the enhancement of video streaming technologies. I
                implemented encrypted HLS feeds using an FFMPEG processing
                pipeline to prevent content piracy and led vulnerability triage
                and resolution efforts on the HackerOne platform. My experience
                also includes upgrading Stripe payment processors to manage
                recurring subscription payments via Recurly and creating mobile
                apps with the Apache Cordova framework.
              </Text>
            </View>

            {/* <View style={styles.coverLetterParagraph}>
        <Text>
          I have also had the opportunity to work as a Freelance Web
          Developer, where I demonstrated my ability to independently manage
          and execute projects. At Clean Lines Lawn Care, I rewrote
          front-end code from jQuery/HTML to React JSX and refactored
          repositories to adhere to modern standards, integrating package
          management using NPM.
        </Text>
      </View> */}

            <View style={styles.coverLetterParagraph}>
              <Text>
                My technical skills include proficiency in TypeScript, HTML5,
                CSS3, Sass, PostgreSQL, and various libraries and frameworks
                such as React, Next.js, Vite, and Node.js. I am adept at using
                development software like Figma, Trello, Asana, and Jira to
                manage projects and collaborate with teams effectively.
              </Text>
            </View>

            {/* <View style={styles.coverLetterParagraph}>
        <Text>
          I hold a degree in Computer Science from ECPI University, which
          has provided me with a strong foundation in the principles of
          software development and problem-solving.
        </Text>
      </View> */}

            <View style={styles.coverLetterParagraph}>
              <Text>
                I am particularly excited about the opportunity at{' '}
                {coverLetterParameters.companyName} because{' '}
                {coverLetterParameters.specificReasons}. I am eager to bring my
                background in full-stack development and my passion for creating
                efficient, user-friendly web applications to your team.
              </Text>
            </View>

            <View style={styles.coverLetterParagraph}>
              <Text>
                Thank you for considering my application. I look forward to the
                opportunity to discuss how my skills and experiences align with
                the needs of your team. Please feel free to contact me at{' '}
                {personalInfo.contact.email} or {personalInfo.contact.phone} to
                schedule a discussion.
              </Text>
            </View>

            <View style={styles.coverLetterEnding}>
              <Text>Sincerely,</Text>
              <Text>&nbsp;</Text>
              <Text>{personalInfo.name}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    ),
    [coverLetterParameters],
  )
}
