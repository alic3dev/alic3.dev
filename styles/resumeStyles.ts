import type { Style } from '@react-pdf/types'

import type { ResumeColors, ResumeFonts } from './resumeStyles.types'

import { StyleSheet } from '@react-pdf/renderer'

import { flavors } from '@catppuccin/palette'
const { latte } = flavors

export const colors: ResumeColors = {
  background: '#ffffff',

  text: latte.colors.text.hex,
  textLight: latte.colors.subtext1.hex,
  textLighter: latte.colors.overlay0.hex,
  textDark: '#000',
}

const fonts: ResumeFonts = {
  body: 'NotoSans-Regular',
  heading: 'NotoSans-Bold',
}

export const styles: { [className: string]: Style } = StyleSheet.create({
  page: {
    flexDirection: 'column',

    maxHeight: '100vh',

    backgroundColor: colors.background,
    color: colors.text,

    fontSize: '12pt',
    fontWeight: 400,
    fontFamily: fonts.body,
  },

  coverLetterPage: {
    flexDirection: 'column',

    maxHeight: '100vh',

    padding: '40pt',
    paddingTop: '0pt',
    paddingBottom: '0pt',

    backgroundColor: colors.background,
    color: colors.text,

    fontSize: '12pt',
    fontWeight: 400,
    fontFamily: fonts.body,
  },

  personalInfo: {
    color: colors.textLight,
    fontSize: '10pt',
    paddingTop: '10pt',
    paddingBottom: '10pt',
  },

  coverLetterParagraph: {
    paddingTop: '5pt',
    paddingBottom: '5pt',
  },

  coverLetterOpening: {
    paddingTop: '10pt',
    paddingBottom: '20pt',
  },

  coverLetterEnding: {
    paddingTop: '20pt',
  },

  header: {
    width: '100%',

    paddingTop: '15pt',
    paddingBottom: '5pt',

    textAlign: 'center',
  },
  headerName: {
    marginBottom: '2pt',

    fontSize: '24pt',
    letterSpacing: '1pt',
  },
  headerTitle: {
    color: colors.textLight,
    fontSize: '14pt',
  },

  summary: {
    paddingLeft: '20pt',
    // paddingRight: '20pt',
    paddingBottom: '20pt',
    color: colors.textDark,
    fontSize: '10pt',
  },

  summaryT: {
    paddingTop: '10pt',
    paddingLeft: '33pt',
    paddingRight: '33pt',
    paddingBottom: '10pt',
    color: colors.textDark,
    fontSize: '10pt',
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'start',

    height: '100%',
  },
  mainContent: {
    width: '70%',

    padding: '20pt',
    paddingLeft: '10pt',
    paddingRight: '10pt',
    paddingBottom: '0pt',
  },
  sideContent: {
    alignSelf: 'baseline',

    minHeight: '0%',
    width: '30%',

    paddingRight: '20pt',

    fontSize: '10pt',
  },

  contentSection: {
    padding: '20pt 20pt',
    paddingRight: '0pt',
  },

  heading: {
    paddingBottom: '10pt',

    color: colors.textLight,
    fontSize: '14pt',
    fontFamily: fonts.heading,
    textTransform: 'uppercase',
    letterSpacing: '1pt',
  },
  experience: {
    paddingLeft: '11pt',
  },
  subHeading: {
    paddingBottom: '5pt',
    marginTop: '20pt',
    marginBottom: '5pt',

    fontSize: '12pt',
    fontFamily: fonts.heading,
  },
  subHeadingCompact: {
    paddingBottom: '5pt',
    marginBottom: '5pt',

    fontSize: '12pt',
    fontFamily: fonts.heading,
  },

  company: {
    marginBottom: '20pt',
    paddingLeft: '10pt',

    borderLeft: `1pt solid ${colors.textLighter}`,
    borderTopLeftRadius: '5pt',
    borderBottomLeftRadius: '5pt',
  },

  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: colors.textLight,
    fontSize: '10pt',
  },
  companyName: {},
  companyPositionLocation: {},

  companyPosition: {
    marginBottom: '10pt',
  },

  companyPositionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyPositionName: {
    fontFamily: fonts.heading,
  },
  companyPositionLength: {
    color: colors.textLight,
    fontSize: '10pt',
  },

  companyPositionDescription: {
    padding: '5pt',
    paddingLeft: '0pt',

    color: colors.textDark,
    fontSize: '10pt',
  },

  educationShortName: {
    fontFamily: fonts.heading,
  },
  educationName: {
    color: colors.textLight,
    fontSize: '10pt',
  },
  educationPositionLength: {
    color: colors.textLight,
    fontSize: '10pt',
  },

  textContainer: {
    flexDirection: 'row',

    marginBottom: '5pt',
  },
  textContainerPosition: {
    flexDirection: 'row',

    marginBottom: '2pt',
  },

  sideContentText: {
    color: colors.textLight,
  },

  link: {
    textDecoration: 'none',
  },

  skillsText: {
    color: colors.textLight,
  },

  icon: {
    marginRight: '5pt',
  },
  iconSmall: {
    marginRight: '5pt',
    marginTop: '3pt',
  },
})
