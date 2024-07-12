'use client'

import React from 'react'

import { H1Container, H3Container, DivContainer } from '@/components/Containers'
import { TypedText } from '@/components/TypedText'
import { BG } from '@/components/decorative/BG'

import { useTypedText } from '@/hooks/useTypedText'
import { usePipelineEmoji } from '@/hooks/usePipelineEmoji'

import styles from '@/components/HomeIntro.module.scss'

const introText: string[] = [
  "Hi, I'm ",
  'Alice ',
  'XXX',
  'A developer focused on interactive experiences',
  'XXXXXX',
  'Lets create together!',
]

function Bubble({
  Container = DivContainer,
  fullText,
  typedText,
  rainbow = [],
  children,
}: React.PropsWithChildren<{
  Container?: React.FunctionComponent<
    React.PropsWithChildren<{ className: string | undefined }>
  >
  fullText: string
  typedText: string[]
  rainbow?: number[]
}>): React.ReactNode {
  return (
    <Container className={styles.bubble}>
      <div className={styles['bubble-placeholder']}>
        {fullText}
        {children}
      </div>

      <div className={styles['bubble-text']}>
        {typedText.map(
          (text: string, index: number): React.ReactNode => (
            <TypedText
              key={index}
              text={text}
              rainbow={rainbow.includes(index)}
            />
          ),
        )}

        {children}
      </div>
    </Container>
  )
}

export function HomeIntro(): React.ReactNode {
  const typedText: string[] = useTypedText(introText, {
    initialDelay: 300,
    delayTimeMin: 20,
    delayTimeMax: 50,
  })
  const [emoji, swapEmoji, resetEmoji] = usePipelineEmoji()

  return (
    <>
      <BG visible={!!(typedText[4] && typedText[4].length)} />

      <div className={styles.intro}>
        {typedText[0] && typedText[0].length ? (
          <Bubble
            Container={H1Container}
            fullText={introText.slice(0, 2).join(' ')}
            typedText={typedText.slice(0, 2)}
            rainbow={[1]}
          >
            <button
              className={`${styles.emoji} ${
                typedText[2] && typedText[2].length ? styles.visible : ''
              } unstyled`}
              onMouseLeave={resetEmoji}
              onClick={swapEmoji}
            >
              <span>🙂</span>
              <span>{emoji}</span>
            </button>
          </Bubble>
        ) : (
          <></>
        )}

        <div
          className={`${styles['bubble-divider']} ${
            typedText[3] && typedText[3].length ? styles.visible : ''
          }`}
        />

        {typedText[3] && typedText[3].length ? (
          <Bubble
            Container={H3Container}
            fullText={introText[3]}
            typedText={[typedText[3]]}
          />
        ) : (
          <></>
        )}
      </div>

      <div className={styles.outro}>
        {typedText[5] && typedText[5].length && (
          <Bubble fullText={introText[5]} typedText={[typedText[5]]} />
        )}
      </div>
    </>
  )
}
