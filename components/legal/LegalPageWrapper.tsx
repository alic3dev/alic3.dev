import styles from '@/components/legal/LegalPageWrapper.module.scss'

export function LegalPageWrapper({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  return <div className={styles.wrapper}>{children}</div>
}
