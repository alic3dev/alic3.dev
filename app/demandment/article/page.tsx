import type { Metadata } from 'next'

import React from 'react'

import { Header, Footer, Quote, CW } from '@/components/demandment'

import styles from '@/app/demandment/article/article.module.scss'

export const metadata: Metadata = {
  title: 'D3M@NDMENt: A musing of souls',
  description: 'A musing of souls',
}

// The weight of despair
// Heavy on my heart,
// A never-ending abyss of sorrow,
// Consuming me, tearing me apart.
// Memories flood my mind,
// Of loss, of pain, of tears.
// A cycle of torment, relentless, unkind,
// A burden I can't escape or reverse.

// Trauma, a cruel and unremitting foe,
// Lingering in my conscious like a ghost,
// Refusing to leave, always with me,
// Drowning me in an ocean of remorse and doubt.

//

// My grandfather's gaze, once kind and warm,
// Now replaced by the cold, harsh touch of fate.
// His presence a painful reminder,
// Of the days we'll never get to take back.

// Memories, bittersweet and bittersweet,
// Like the taste of regret, sharp as a knife.
// His laugh, a distant echo in the night,
// A symphony of longing and solitude.

//

// The family dog's wagging tail, a memory now still,
// The silent house, once filled with laughter, now a lonely jail.
// My sister, once a playful companion, now a faded picture on the wall,
// The void of their absence, a constant weight, an endless pall.

// In the silence of the past, a symphony of pain and grief,
// Where once there was joy, now only tears to weep.

//

// Your presence, a paradox of comfort and torment,
// Confusion and resignation swirling together, forming an awful torment.
// Your sharp tongue cuts deeper than any knife,
// Leaving a trail of words that sting like a stinging blight.

// In your shadow, I grapple with conflicting emotions,
// Torn between gratitude for your existence and the pain you've bestowed upon me.

export default function DemandmentPage(): React.ReactElement {
  return (
    <>
      <Header />

      <Quote content={<>A musing of souls</>} />

      <article className={styles.content}>
        <section className={styles.main}>
          <CW warnings={['Rape', 'Beastiality', 'Regligious Trauma']} />

          <br />

          <h2>A musing of souls</h2>
          <address>by Alibse</address>
          {/* <time dateTime="2015-05-16 19:00">May 16</time> */}

          <br />
          <br />

          <p>
            Interlinked co-communication,
            <br />
            strewn a-cross,
            <br />
            many a station.
          </p>
        </section>
      </article>

      <Footer />
    </>
  )
}
