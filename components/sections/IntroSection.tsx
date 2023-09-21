import Section from './Section'
import styles from './IntroSection.module.scss'

export const IntroSection: React.FC = (): JSX.Element => {
  return (
    <Section>
      <a className={styles.next} aria-label="Next section" href="#work" />
    </Section>
  )
}

export default IntroSection
