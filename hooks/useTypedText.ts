import React from 'react'

interface UseTypedTextOptions {
  delayTimeMax: number
  delayTimeMin: number
}

export function useTypedText(
  textToType: string[],
  _options: Partial<UseTypedTextOptions> = {},
): string[] {
  const [typedText, setTypedText] = React.useState<string[]>((): string[] =>
    new Array(textToType.length).fill(''),
  )

  let options = React.useRef<UseTypedTextOptions>({
    delayTimeMax: 125,
    delayTimeMin: 25,
    ..._options,
  })

  const refObj = React.useRef<{
    index: number
    finished: boolean
    animationFrameHandle: number
    prevTime: number
    typeDelay: number
  }>({
    index: 0,
    finished: false,
    animationFrameHandle: -1,
    prevTime: 0,
    typeDelay:
      Math.random() *
        (options.current.delayTimeMax - options.current.delayTimeMin) +
      options.current.delayTimeMin,
  })

  React.useEffect((): void | (() => void) => {
    if (refObj.current.finished) return

    let animationFrameHandle: number

    const typeText = (time: DOMHighResTimeStamp): void => {
      if (time - refObj.current.prevTime > refObj.current.typeDelay) {
        setTypedText((prevTypedText: string[]): string[] => {
          if (refObj.current.finished) {
            return prevTypedText
          }

          const newTypedText: string[] = [...prevTypedText]

          let index: number = refObj.current.index

          if (newTypedText[index].length === textToType[index].length) {
            refObj.current.index = index + 1
            index++
          }

          if (!textToType[index]) {
            refObj.current.finished = true
            window.cancelAnimationFrame(refObj.current.animationFrameHandle)
            return newTypedText
          }

          if (!newTypedText[index]) {
            newTypedText[index] = ''
          }

          let newChars: string = textToType[index][newTypedText[index].length]

          if (newChars === '\uD83D') {
            newChars += textToType[index][newTypedText[index].length + 1]
          }

          newTypedText[index] += newChars

          return newTypedText
        })

        refObj.current.typeDelay =
          Math.random() *
            (options.current.delayTimeMax - options.current.delayTimeMin) +
          options.current.delayTimeMin
        refObj.current.prevTime = time
      }

      if (!refObj.current.finished) {
        refObj.current.animationFrameHandle =
          window.requestAnimationFrame(typeText)
        animationFrameHandle = refObj.current.animationFrameHandle
      }
    }
    refObj.current.animationFrameHandle = window.requestAnimationFrame(typeText)
    animationFrameHandle = refObj.current.animationFrameHandle

    return (): void => {
      window.cancelAnimationFrame(animationFrameHandle)
    }
  }, [textToType])

  return typedText
}
