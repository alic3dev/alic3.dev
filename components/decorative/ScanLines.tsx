'use client'

import React from 'react'

import styles from '@/components/decorative/ScanLines.module.scss'

export function ScanLines({
  resolution = { x: 2560, y: 2560 },
}: {
  resolution?: { x: number; y: number }
}): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    let animationFrameHandler: number

    let lastTime: number = 0

    if (!canvasRef.current) return

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    const animationFrame = (time: DOMHighResTimeStamp): void => {
      if (lastTime && time - lastTime < 50) {
        animationFrameHandler = requestAnimationFrame(animationFrame)
        return
      }

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      const data: ImageData = new ImageData(
        ctx.canvas.width,
        ctx.canvas.height,
        { colorSpace: 'srgb' },
      )

      for (let x = 0; x < data.width; x++) {
        if (Math.random() > 0.2) continue

        const yPos: number = Math.floor(Math.random() * data.height)
        const yLen: number = Math.floor((Math.random() * data.height) / 10)

        for (let y = yPos; y < yPos + yLen && y < data.height; y++) {
          const dataPos: number = (x + y * data.width) * 4
          const dataVal: number = Math.floor(Math.random() * 200) + 55

          data.data[dataPos] = dataVal
          data.data[dataPos + 1] = dataVal
          data.data[dataPos + 2] = dataVal
          data.data[dataPos + 3] = 200
        }
      }

      ctx.putImageData(data, 0, 0)

      lastTime = time
      animationFrameHandler = requestAnimationFrame(animationFrame)
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
