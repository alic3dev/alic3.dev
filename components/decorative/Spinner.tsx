import { ImSpinner2 } from 'react-icons/im'

import styles from '@/components/decorative/Spinner.module.scss'

export function Spinner({ large }: { large?: boolean }): React.ReactElement {
  return (
    <div className={`${styles.spinner} ${large ? styles.large : ''}`}>
      <ImSpinner2 />
    </div>
  )
}
