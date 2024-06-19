import React from 'react'

const emojiPipeline: Record<string, string> = {
  '🥵': '😣',
  '😣': '😳',
  '😳': '😔',
  '😔': '😞',
  '😞': '😮‍💨',
  '😮‍💨': '😴',
  '😴': '😪',
  '😪': '😴',
  '😛': '😝',
  '😝': '😛',
  '👀': '🙄',
  '🙄': '😳',
}

type SwapEmoji = () => void
type ResetEmoji = () => void

export function usePipelineEmoji(): [string, SwapEmoji, ResetEmoji] {
  const [emoji, setEmoji] = React.useState('😛')
  const emojiSwaps = React.useRef<{ value: number }>({ value: 0 })

  const swapEmoji: SwapEmoji = React.useCallback((): void => {
    setEmoji((prevEmoji: string): string => {
      if (emojiSwaps.current.value === 10) {
        return '🥵'
      } else if (
        emojiSwaps.current.value > 0 &&
        emojiSwaps.current.value % 100 === 0
      ) {
        return '👀'
      }

      return emojiPipeline[prevEmoji] ?? '😛'
    })

    emojiSwaps.current.value++
  }, [])

  const resetEmoji: ResetEmoji = React.useCallback((): void => {
    setEmoji('😛')
    emojiSwaps.current.value = 0
  }, [])

  return [emoji, swapEmoji, resetEmoji]
}
