import { StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types'

import { variants } from '@catppuccin/palette'
const { latte } = variants

export const colors: { [color: string]: string } = {
  accent: latte.sky.hex,
  lightText: latte.text.hex,
}

export const styles: { [className: string]: Style } = StyleSheet.create({
  page: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
    fontSize: '12pt',
    fontWeight: 400,
    fontFamily: 'Helvetica',
  },
  header: {
    width: '100%',
    paddingTop: '30pt',
    paddingLeft: '20pt',
    paddingBottom: '20pt',
    backgroundColor: latte.text.hex,
    color: latte.base.hex,
  },
  headerName: {
    marginBottom: '5pt',
    fontSize: '24pt',
  },
  headerTitle: {
    fontSize: '18pt',
    color: 'rgba(255,255,255,0.75)',
  },
  mainContent: {
    height: '87.9795471524171%',
    width: '70%',
    padding: '20pt',
    paddingBottom: '0',
  },
  sideContent: {
    height: '87.9795471524171%',
    width: '30%',
    padding: '20pt 20pt',
    paddingBottom: '0',
    backgroundColor: latte.base.hex,
  },
  contentSection: {
    paddingBottom: '40pt',
  },
  heading: {
    fontSize: '14pt',
    fontFamily: 'Helvetica-Bold',
    paddingBottom: '5pt',
    marginBottom: '20pt',
    borderBottom: `2pt solid ${colors.lightText}`,
  },
  subHeading: {
    fontSize: '12pt',
    fontFamily: 'Helvetica-Bold',
    paddingBottom: '5pt',
    marginTop: '20pt',
    marginBottom: '20pt',
    opacity: 0.8,
    borderBottom: `1pt solid ${colors.lightText}`,
  },
  subHeadingCompact: {
    fontSize: '12pt',
    fontFamily: 'Helvetica-Bold',
    paddingBottom: '5pt',
    marginBottom: '20pt',
    opacity: 0.8,
    borderBottom: `1pt solid ${colors.lightText}`,
  },
  company: {
    marginBottom: '8pt',
    borderBottom: `1pt solid ${colors.lightText}`,
  },
  companyName: {
    alignSelf: 'flex-start',
    marginBottom: '2pt',
    fontSize: '11pt',
  },
  companyPosition: {
    marginBottom: '0pt',
  },
  companyPositionName: {
    marginBottom: '2pt',
    fontFamily: 'Helvetica-Bold',
  },
  companyPositionInfo: {
    flexDirection: 'row',
    fontSize: '11pt',
  },
  companyPositionLocation: {
    color: colors.lightText,
  },
  companyPositionLength: {
    color: colors.lightText,
  },
  companyPositionDescription: {
    fontSize: '12pt',
    padding: '5pt 20pt',
    paddingLeft: '0pt',
  },
  educationName: {
    alignSelf: 'flex-start',
    fontFamily: 'Helvetica-Bold',
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
    color: colors.lightText,
  },
  skillsText: {
    color: colors.lightText,
  },
  icon: {
    marginRight: '5pt',
  },
  iconSmall: {
    marginRight: '5pt',
    marginTop: '3pt',
  },
})

export default styles
