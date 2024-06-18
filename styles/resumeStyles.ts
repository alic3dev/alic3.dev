import type { Style } from '@react-pdf/types'

import type { ResumeColors, ResumeFonts } from './resumeStyles.types'

import { StyleSheet } from '@react-pdf/renderer'

import { variants } from '@catppuccin/palette'
const { latte } = variants

export const colors: ResumeColors = {
  background: '#ffffff',

  text: latte.text.hex,
  textLight: latte.subtext1.hex,
  textLighter: latte.overlay0.hex,
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
    paddingBottom: '0',
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
    padding: '5pt 20pt',
    paddingLeft: '0pt',

    color: '#000',
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
