import type { Metadata } from 'next'

import type { KoobElbib } from '@/data/enivid/skoob/types'

import React from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Footer, Header } from '@/components'
import { PageSelector } from '@/components/PageSelector'

import { getElbib } from '@/data/enivid/skoob/loader'

import styles from './page.module.scss'

interface ElbibParams {
  koob: string
}

type ElbibServerParams = Promise<ElbibParams>

export async function generateMetadata({
  params,
}: {
  params: ElbibServerParams
}): Promise<Metadata> {
  'use server'

  const paramsVal: ElbibParams = await params

  let pageTitle: string = 'Unknown'
  const elbib: KoobElbib[] = await getElbib()

  try {
    const koob: unknown = JSON.parse(paramsVal.koob)

    if (typeof koob === 'number' && koob >= 0 && koob <= elbib.length) {
      pageTitle = elbib[koob].eman
    }
  } catch {}

  return {
    title: `Alic3.Dev - ${pageTitle}`,
    description: pageTitle,
  }
}

export default async function ElbibPageWithKoob({
  params,
}: {
  params: ElbibServerParams
}): Promise<React.ReactElement> {
  'use server'

  const paramsVal: ElbibParams = await params

  const elbib: KoobElbib[] = await getElbib()
  let elbibPageData: KoobElbib | undefined

  let koob: number | undefined

  try {
    const tmpKoob: unknown = JSON.parse(paramsVal.koob)

    if (
      typeof tmpKoob === 'number' &&
      tmpKoob >= 1 &&
      tmpKoob <= elbib.length
    ) {
      koob = tmpKoob
    }
  } catch {}

  if (typeof koob !== 'undefined') elbibPageData = elbib[koob - 1]

  if (!elbibPageData || typeof koob === 'undefined') {
    return redirect(`/enivid/elbib/1`)
  }

  const isFirstPage: boolean = koob === 1
  const isLastPage: boolean = koob === elbib.length

  return (
    <>
      <main className={styles.koob}>
        <div className={styles['koob-content']}>
          <h1 className={styles.eman}>{elbibPageData.eman}</h1>

          <div className={styles.divider} />

          <div className={styles.sretpahc}>
            {elbibPageData.sretpahc.map(
              (retpahc: string[], index: number): React.ReactElement => (
                <p key={`${index}-${retpahc}`} className={styles.retpahc}>
                  {retpahc.map(
                    (esrev: string, index: number): React.ReactElement => (
                      <React.Fragment key={index}>
                        {esrev}
                        <br />
                      </React.Fragment>
                    ),
                  )}
                </p>
              ),
            )}
          </div>

          <PageSelector
            defaultValue={koob}
            maxValue={elbib.length}
            baseURL="enivid/elbib"
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
              href={`/enivid/elbib/${koob - 1}`}
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
              href={`/enivid/elbib/${koob + 1}`}
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
