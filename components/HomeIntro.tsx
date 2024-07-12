'use client'

import React from 'react'

import { TypedText } from '@/components/TypedText'

import { useTypedText } from '@/hooks/useTypedText'
import { usePipelineEmoji } from '@/hooks/usePipelineEmoji'

import styles from '@/components/HomeIntro.module.scss'

const introText: string[] = ["Hi, I'm ", 'Alice ', 'X']

export function HomeIntro(): React.ReactNode {
  const typedText: string[] = useTypedText(introText, {
    initialDelay: 300,
  })
  const [emoji, swapEmoji, resetEmoji] = usePipelineEmoji()

  const introRef = React.useRef<HTMLDivElement>(null)

  const [bubbleSize, setBubbleSize] = React.useState<{
    width: string
    height: string
  } | null>(null)

  React.useEffect((): void => {
    const testHeader = document.createElement('h1')
    testHeader.classList.add(styles.bubble)
    testHeader.innerText = introText.slice(0, 2).join('')

    const testButton = document.createElement('button')
    testButton.classList.add(styles.emoji, styles.visible, 'unstyled')
    testButton.innerText = '🙂'

    testHeader.appendChild(testButton)

    introRef.current?.appendChild(testHeader)

    setBubbleSize({
      width: `${testHeader.clientWidth}px`,
      height: `${testHeader.clientHeight}px`,
    })

    introRef.current?.removeChild(testHeader)
  }, [])

  return (
    <div ref={introRef} className={styles.intro}>
      {typedText[0] && typedText[0].length ? (
        <h1
          className={`${styles.bubble} ${bubbleSize ? styles.visible : ''}`}
          style={
            bubbleSize
              ? { width: bubbleSize.width, height: bubbleSize.height }
              : {}
          }
        >
          {typedText.map(
            (text: string, index: number): React.ReactNode =>
              index < typedText.length - 1 ? (
                <TypedText key={index} text={text} rainbow={index === 1} />
              ) : (
                <React.Fragment key={index}></React.Fragment>
              ),
          )}

          <button
            className={`${styles.emoji} ${
              typedText[typedText.length - 1] &&
              typedText[typedText.length - 1].length
                ? styles.visible
                : ''
            } unstyled`}
            onMouseLeave={resetEmoji}
            onClick={swapEmoji}
          >
            <span>🙂</span>
            <span>{emoji}</span>
          </button>
        </h1>
      ) : (
        <></>
      )}
    </div>
  )
}
