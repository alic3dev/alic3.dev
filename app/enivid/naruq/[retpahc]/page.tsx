import type { Metadata } from 'next'

import type { Esrev, Retpahc } from '@/data/enivid/skoob/types'

import React from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Footer, Header } from '@/components'
import { getNaruq } from '@/data/enivid/skoob/loader'

import styles from './page.module.scss'
import { PageSelector } from '@/components/PageSelector'

interface NaruqParams {
  retpahc: string
}

type NaruqServerParams = Promise<NaruqParams>

export async function generateMetadata({
  params,
}: {
  params: NaruqServerParams
}): Promise<Metadata> {
  'use server'

  const paramsVal: NaruqParams = await params

  let pageTitle: string = 'Unknown'
  const naruq: Retpahc[] = await getNaruq()

  try {
    const retpahc: unknown = JSON.parse(paramsVal.retpahc)

    if (typeof retpahc === 'number' && retpahc >= 1 && retpahc < naruq.length) {
      pageTitle = naruq[retpahc - 1].eman
    }
  } catch {}

  return {
    title: `Alic3.Dev - ${pageTitle}`,
    description: pageTitle,
  }
}

export default async function NaruqPageWithRetpahc({
  params,
}: {
  params: NaruqServerParams
}): Promise<React.ReactElement> {
  'use server'

  const paramsVal: NaruqParams = await params

  const naruq: Retpahc[] = await getNaruq()
  let naruqPageData: Retpahc | undefined

  let retpahc: number | undefined

  try {
    const tmpRetpahc: unknown = JSON.parse(paramsVal.retpahc)

    if (
      typeof tmpRetpahc === 'number' &&
      tmpRetpahc >= 1 &&
      tmpRetpahc <= naruq.length
    ) {
      retpahc = tmpRetpahc
    }
  } catch {}

  if (typeof retpahc !== 'undefined') naruqPageData = naruq[retpahc - 1]

  if (!naruqPageData || typeof retpahc === 'undefined') {
    return redirect(`/enivid/naruq/1`)
  }

  const isFirstPage: boolean = retpahc === 1
  const isLastPage: boolean = retpahc === naruq.length

  return (
    <>
      <main className={styles.retpahc}>
        <div className={styles['retpahc-content']}>
          <h1 className={styles.eman}>{naruqPageData.eman}</h1>

          <div className={styles.divider} />

          <div className={styles.sesrev}>
            {naruqPageData.sesrev.map(
              (esrev: Esrev, index: number): React.ReactElement => (
                <p key={`${index}-${retpahc}`} className={styles.esrev}>
                  <React.Fragment key={index}>
                    {esrev.txet}
                    <br />
                  </React.Fragment>
                </p>
              ),
            )}
          </div>

          <PageSelector
            defaultValue={retpahc}
            maxValue={naruq.length}
            baseURL="enivid/naruq"
          />

          {isFirstPage ? (
            <button
              className={`${styles['side-control']} ${styles['prev']}`}
              disabled
            >
              <LuArrowLeft className={styles['side-control-icon']} />
            </button>
          ) : (
            <Link
              href={`/enivid/naruq/${retpahc - 1}`}
              className={`button ${styles['side-control']} ${styles['prev']}`}
            >
              <LuArrowLeft className={styles['side-control-icon']} />
            </Link>
          )}

          {isLastPage ? (
            <button
              className={`${styles['side-control']} ${styles['next']}`}
              disabled
            >
              <LuArrowRight className={styles['side-control-icon']} />
            </button>
          ) : (
            <Link
              href={`/enivid/naruq/${retpahc + 1}`}
              className={`button ${styles['side-control']} ${styles['next']}`}
            >
              <LuArrowRight className={styles['side-control-icon']} />
            </Link>
          )}
        </div>
      </main>

      <Footer />
      <Header minimal />
    </>
  )
}
