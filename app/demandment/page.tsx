import type { Metadata } from 'next'

import React from 'react'
import Link from 'next/link'

import {
  Eye,
  Header,
  Footer,
  Quote,
  InlineTitle,
} from '@/components/demandment'

import styles from '@/app/demandment/page.module.scss'

export const metadata: Metadata = {
  title: 'D3M@NDMENt - by Alic3',
  description: 'D3M@NDMENt - A specication of',
}

interface ArticleMetaData {
  name: string
  release: number
}

const 日 = true

const recentArticles: ArticleMetaData[] = [
  {
    name: 日
      ? '金人中中水金廿戈女水木戈尸十人戈弓廿戈弓土'
      : 'Collective disjointing',
    release: 2,
  },
  {
    name: 日
      ? '田日廿金竹火山中水日口尸人弓中卜中戈尸廿水弓難田竹日廿苳竹水日口'
      : 'Watchful ears only listen to what they hear',
    release: 1,
  },
  {
    name: 日 ? '日一山尸戈丑伙尸人山中尸' : 'A musing of souls',
    release: 0,
  }, 
]

export default function DemandmentPage(): JSX.Element {
  return (
    <>
      <Header />

      <Quote />

      <div className={styles.content}>
        <div className={styles.main}>
          <p>
            {日 ? (
              <>
                䒘蓤馜弓水女水口金人一水，弓人口尸竹日中中戒水女水口。廿竹人山土竹囦㪶葭㐰㫒中水日尸廿日廿廿水一世難葭廿竹日廿田竹戈金竹户山弓日月中水熻廿竹人尸水
              </>
            ) : (
              <>
                The time has never come, nor shall it ever. Though we may try or
                at least attempt to try that which is unable for those of us who
                know. A silent understanding of what or not, that can be all
                that there might hope to achieve. A schism, a shattering of what
                was once two or maybe something lesser than what you can&apos;t
                truly convey. The emotional state or at least the idea of an
                emotion which is unable to be expressed or even felt. A calling.
                A way. A path or at least a place to fall down. Lay. Rest. Try
                again if you so dare.
              </>
            )}
          </p>

          <br />

          <p>
            {日 ? (
              <>
                廿竹水口水尸竹日中中鶢久。。廿人一人口口人田尸火人口水金日尸廿一戈土竹廿鶢日弓人廿竹呇土口日卜戈刀㲑伙土口水水弓尸熻人弓金水廿竹日廿戈尸弓廿廿日戈弓廿沐丹䒘卜水中中人田戈尸竹人口日弓聲尸心水田。
              </>
            ) : (
              <>
                There shall be no.. Tomorrows forecast might be another grayish
                hue of greens for once that isn&apos;t tainted by the yellowish
                orange spew.
              </>
            )}
          </p>

          <hr />

          <p>
            <strong>
              {日 ? (
                <>
                  田水中金人汞難
                  <InlineTitle />
                  。月口人山土升難㐪冖心戈水金汇閑火口日土一水弓廿尸火口人一久人弓水瞞卜人山口尸水中火。蔵户日金人一戈弓土廿人土水廿各。
                </>
              ) : (
                <>
                  Welcome to <InlineTitle />. Brought to you in pieces and
                  fragments from no one but yourself. This is a coming together.
                </>
              )}
            </strong>
          </p>
        </div>

        <div className={styles.side}>
          <Eye />

          <h2>{日 ? <>口水金水鄧日口廿戈金中水尸</> : <>Recent Articles</>}</h2>

          <ul className={styles.articles}>
            {recentArticles.map(
              (article: ArticleMetaData): React.ReactNode => (
                <li key={`$${article.release}: ${article.name}`}>
                  <Link href="/demandment/article">
                    #{article.release}: {article.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  )
}
