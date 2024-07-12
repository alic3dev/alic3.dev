'use client'

import type { ColorScheme, Theme } from '@/contexts'

import React from 'react'

import * as THREE from 'three'

import { ColorSchemeContext, ThemeContext } from '@/contexts'

import styles from '@/components/decorative/BG.module.scss'

interface ThemeColors extends ColorScheme {
  theme: Theme
}

function getRandomDirection(): THREE.Vector3 {
  return new THREE.Vector3(
    (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 0.01 + 0.005),
    0,
    (Math.random() > 0.5 ? -1 : 1) * (Math.random() * 0.01 + 0.005),
  )
}

export function BG(): React.ReactNode {
  const theme = React.useContext(ThemeContext)
  const colorScheme = React.useContext(ColorSchemeContext)

  const themeColors = React.useRef<ThemeColors>({
    theme: theme.theme,
    ...colorScheme,
  })

  React.useEffect((): void => {
    themeColors.current.theme = theme.theme

    themeColors.current = {
      ...themeColors.current,
      ...colorScheme,
    }

    if (renderer.current) {
      renderer.current.setClearColor(themeColors.current.crust)
      //   if (themeContext.theme === 'light') {
      //     renderer.current.domElement.classList.add(styles.invert)
      //   } else {
      //     renderer.current.domElement.classList.remove(styles.invert)
      //   }
    }
  }, [theme, colorScheme])

  const webGLSupported = React.useRef<{ value: boolean }>({ value: true })

  const renderer = React.useRef<THREE.WebGLRenderer>()
  const rendererContainer = React.useRef<HTMLDivElement>(null)
  const rendererProperties = React.useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
  }>()

  React.useEffect((): (() => void) | void => {
    try {
      const canvas = document.createElement('canvas')
      webGLSupported.current.value = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch (e) {
      webGLSupported.current.value = false
    }

    if (!webGLSupported.current.value || !rendererContainer.current) return

    if (!renderer.current) {
      renderer.current = new THREE.WebGLRenderer({ antialias: true })
      renderer.current.setSize(
        rendererContainer.current.clientWidth,
        rendererContainer.current.clientHeight,
      )
      renderer.current.setPixelRatio(window.devicePixelRatio)

      renderer.current.shadowMap.enabled = true
      renderer.current.shadowMap.type = THREE.PCFSoftShadowMap

      renderer.current.setClearColor(themeColors.current.base)

      rendererContainer.current.prepend(renderer.current.domElement)
    }

    if (!rendererProperties.current) {
      const scene: THREE.Scene = new THREE.Scene()
      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        90,
        rendererContainer.current.clientWidth /
          rendererContainer.current.clientHeight,
        0.1,
        1000,
      )
      camera.position.set(-0.5, 4, 5)
      camera.lookAt(-0.5, 0, 0)

      rendererProperties.current = {
        scene,
        camera,
      }
    }

    const onResize: (ev: UIEvent) => void = (): void => {
      rendererProperties.current!.camera.aspect =
        rendererContainer.current!.clientWidth /
        rendererContainer.current!.clientHeight
      rendererProperties.current!.camera.updateProjectionMatrix()

      renderer.current?.setSize(
        rendererContainer.current!.clientWidth,
        rendererContainer.current!.clientHeight,
      )
    }
    window.addEventListener('resize', onResize)

    const animate: XRFrameRequestCallback = (
      time: DOMHighResTimeStamp,
    ): void => {
      renderer.current?.render(
        rendererProperties.current!.scene,
        rendererProperties.current!.camera,
      )
    }
    renderer.current.setAnimationLoop(animate)

    return (): void => {
      renderer.current?.setAnimationLoop(null)

      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={rendererContainer} className={styles.container}>
      <div className={styles.fader} />
    </div>
  )
}
