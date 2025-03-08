import styles from '@/components/legal/LegalPageWrapper.module.scss'

export function LegalPageWrapper({
  children,
}: {
  children: React.ReactElement
}): React.ReactElement {
  return <div className={styles.wrapper}>{children}</div>
}
