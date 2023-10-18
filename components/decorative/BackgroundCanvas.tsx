'use client'

import React from 'react'

import styles from '@/components/decorative/BackgroundCanvas.module.scss'

interface CanvasValues {
  size: number
  sizeDpiAdjusted: number
  animationFrameLastTime: number
  animationFrame: number
}

export default function BackgroundCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const canvasValuesRef = React.useRef<CanvasValues>({
    size: 0,
    sizeDpiAdjusted: 0,
    animationFrame: 0,
    animationFrameLastTime: 0,
  })

  const [active, setActive] = React.useState<boolean>(false)

  const resizeCanvas = React.useCallback(() => {
    if (!canvasRef.current) return

    canvasValuesRef.current.size = Math.max(
      window.innerWidth,
      window.innerHeight
    )
    canvasValuesRef.current.sizeDpiAdjusted =
      canvasValuesRef.current.size * window.devicePixelRatio

    canvasRef.current.width = canvasValuesRef.current.sizeDpiAdjusted
    canvasRef.current.height = canvasValuesRef.current.sizeDpiAdjusted
    canvasRef.current.style.width = `${canvasValuesRef.current.size}px`
    canvasRef.current.style.height = `${canvasValuesRef.current.size}px`

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    const canvasTranslateAmount: number = Math.floor(
      canvasValuesRef.current.size / 2
    )

    ctx.translate(canvasTranslateAmount, canvasTranslateAmount)
  }, [])

  const renderCanvas = React.useCallback((time: number) => {
    const onContinueRender = () =>
      (canvasValuesRef.current.animationFrame =
        requestAnimationFrame(renderCanvas))

    const timeSinceLastFrame: number =
      time - canvasValuesRef.current.animationFrameLastTime

    if (!canvasRef.current || timeSinceLastFrame < 100 || time > 12000)
      return onContinueRender()

    canvasValuesRef.current.animationFrameLastTime = time

    const ctx: CanvasRenderingContext2D | null =
      canvasRef.current.getContext('2d')

    if (!ctx) return onContinueRender()

    ctx.rotate(time * (Math.PI / 180))

    const invBlueAm = Math.random() * 195 + 60
    const blueAm = Math.random() * 32 + 223
    const strokeAlpha = 0.1

    ctx.strokeStyle = `rgba(${invBlueAm}, ${invBlueAm}, ${blueAm}, ${strokeAlpha})`
    ctx.beginPath()
    ctx.arc(0, (Math.random() * window.innerHeight) / 2, 100, 0, 2 * Math.PI)
    ctx.arc(
      -window.innerWidth / 10,
      (Math.random() * window.innerHeight) / 2 - window.innerHeight / 10,
      100,
      0,
      2 * Math.PI
    )
    ctx.arc(0, 0, 100, 0, 2 * Math.PI)
    ctx.arc(100, Math.random() * -50, 100, 0, 2 * Math.PI)
    ctx.arc(Math.random() * -100, 50, 100, 0, 2 * Math.PI)
    ctx.arc(Math.random() * 50, -100, 100, 0, 2 * Math.PI)
    ctx.arc(Math.random() * -50, Math.random() * 100, 100, 0, 2 * Math.PI)
    ctx.arc(0, (Math.random() * -window.innerHeight) / 2, 100, 0, 2 * Math.PI)
    ctx.arc(
      (Math.random() * window.innerWidth) / 10,
      -window.innerHeight / 2 + window.innerHeight / 10,
      100,
      0,
      2 * Math.PI
    )
    ctx.stroke()

    ctx.beginPath()

    ctx.rotate((Math.random() * 70 + 20) * (Math.PI / 180))

    ctx.beginPath()
    ctx.arc(0, window.innerHeight / 2, 100, 0, 2 * Math.PI)
    ctx.arc(
      -window.innerWidth / 10,
      window.innerHeight / 2 - window.innerHeight / 10,
      100,
      0,
      2 * Math.PI
    )
    ctx.arc(0, 0, 100, 0, 2 * Math.PI)
    ctx.arc(100, -50, 100, 0, 2 * Math.PI)
    ctx.arc(-100, 50, 100, 0, 2 * Math.PI)
    ctx.arc(50, -100, 100, 0, 2 * Math.PI)
    ctx.arc(-50, 100, 100, 0, 2 * Math.PI)
    ctx.arc(0, -window.innerHeight / 2, 100, 0, 2 * Math.PI)
    ctx.arc(
      window.innerWidth / 10,
      -window.innerHeight / 2 + window.innerHeight / 10,
      100,
      0,
      2 * Math.PI
    )
    ctx.stroke()

    onContinueRender()
  }, [])

  // Setup window resize handler
  React.useEffect(() => {
    window.addEventListener('resize', resizeCanvas)

    resizeCanvas()

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // Fade canvas into existence from obscurity
  React.useEffect(() => setActive(true), [])

  // Render and animate canvas content
  React.useEffect(() => {
    const localCanvasValuesRef: CanvasValues = canvasValuesRef.current

    localCanvasValuesRef.animationFrame = requestAnimationFrame(renderCanvas)

    return () => cancelAnimationFrame(localCanvasValuesRef.animationFrame)
  }, [renderCanvas])

  return (
    <div className={styles['background-canvas-wrapper']}>
      <canvas
        ref={canvasRef}
        className={`${styles['background-canvas']} ${
          active ? styles['active'] : ''
        }`}
      ></canvas>
    </div>
  )
}
