import styles from './LegalPageWrapper.module.scss'

export default function LegalPageWrapper({
  children,
}: {
  children: JSX.Element
}) {
  return <div className={styles.wrapper}>{children}</div>
}
