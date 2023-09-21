import styles from './Section.module.scss'

export const Section: React.FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return <section className={styles.section}>{children}</section>
}

export default Section
