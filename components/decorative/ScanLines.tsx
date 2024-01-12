'use client'

import React from 'react'

import styles from './ScanLines.module.scss'

export function ScanLines({
  resolution = { x: 2560, y: 2560 },
}: {
  resolution?: { x: number; y: number }
}): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    let animationFrameHandler: number

    const animationFrame = (time: DOMHighResTimeStamp): void => {
      if (!canvasRef.current) return
      // animationFrameHandler = requestAnimationFrame(animationFrame)
    }

    animationFrameHandler = requestAnimationFrame(animationFrame)

    return () => cancelAnimationFrame(animationFrameHandler)
  }, [])

  return (
    <canvas
      width={resolution.x}
      height={resolution.y}
      className={styles.canvas}
      ref={canvasRef}
    >
      ）：　ネズたいめ　：（
    </canvas>
  )
}
