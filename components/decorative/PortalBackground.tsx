import React from 'react'
import Image from 'next/image'

import { ScanLines } from '@/components/decorative'

import styles from './PortalBackground.module.scss'

export function PortalBackground(): JSX.Element {
  return (
    <div className={styles.background}>
      <div className={styles['images-container']}>
        <Image
          className={styles.image}
          src="/131ee4045b158af250e7b47a148729ef.jpeg"
          width={1024}
          height={1024}
          quality={100}
          alt="background"
        />
        <Image
          className={styles.image}
          src="/efe1e1e6e17923712943fecd5060f5dd.jpeg"
          width={1024}
          height={1024}
          quality={100}
          alt="background"
        />
        <Image
          className={styles.image}
          src="/ad6ddd79494120eae3443ce861855f52.jpeg"
          width={1024}
          height={1024}
          quality={100}
          alt="background"
        />
      </div>

      <ScanLines />
    </div>
  )
}
