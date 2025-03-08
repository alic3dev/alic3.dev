'use client'

import type { ColorScheme, Theme } from '@/contexts'

import React from 'react'

import * as THREE from 'three'

import { ColorSchemeContext, ThemeContext } from '@/contexts'

import styles from '@/components/decorative/BG.module.scss'

interface ThemeColors extends ColorScheme {
  theme: Theme
  cubeLinesMaterialColor: keyof ColorScheme
  progressCubeMaterialColor: () => keyof ColorScheme
}

export function BG({ visible = true }: { visible: boolean }): React.ReactNode {
  const theme = React.useContext(ThemeContext)
  const colorScheme = React.useContext(ColorSchemeContext)

  const themeColors = React.useRef<ThemeColors>({
    theme: theme.theme,
    cubeLinesMaterialColor: 'blue',
    progressCubeMaterialColor: (): keyof ColorScheme => {
      switch (themeColors.current.cubeLinesMaterialColor) {
        case 'blue':
          themeColors.current.cubeLinesMaterialColor = 'lavender'
          break
        case 'lavender':
          themeColors.current.cubeLinesMaterialColor = 'rosewater'
          break
        case 'rosewater':
          themeColors.current.cubeLinesMaterialColor = 'flamingo'
          break
        case 'flamingo':
          themeColors.current.cubeLinesMaterialColor = 'pink'
          break
        case 'pink':
          themeColors.current.cubeLinesMaterialColor = 'mauve'
          break
        case 'mauve':
          themeColors.current.cubeLinesMaterialColor = 'red'
          break
        case 'red':
          themeColors.current.cubeLinesMaterialColor = 'maroon'
          break
        case 'maroon':
          themeColors.current.cubeLinesMaterialColor = 'peach'
          break
        case 'peach':
          themeColors.current.cubeLinesMaterialColor = 'yellow'
          break
        case 'yellow':
          themeColors.current.cubeLinesMaterialColor = 'green'
          break
        case 'green':
          themeColors.current.cubeLinesMaterialColor = 'teal'
          break
        case 'teal':
          themeColors.current.cubeLinesMaterialColor = 'sky'
          break
        case 'sky':
          themeColors.current.cubeLinesMaterialColor = 'sapphire'
          break
        case 'sapphire':
        default:
          themeColors.current.cubeLinesMaterialColor = 'blue'
          break
      }

      return themeColors.current.cubeLinesMaterialColor
    },
    ...colorScheme,
  })

  const mousePosition = React.useRef<THREE.Vector2>(new THREE.Vector2(-1, -1))
  const mousedDownPosition = React.useRef<THREE.Vector2 | null>(null)

  const webGLSupported = React.useRef<{ value: boolean }>({ value: true })

  const renderer = React.useRef<THREE.WebGLRenderer | null>(null)
  const rendererContainer = React.useRef<HTMLDivElement | null>(null)
  const rendererProperties = React.useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    raycaster: THREE.Raycaster
    cubeGroup: THREE.Group
    cubeMesh: THREE.Mesh
    cubeLines: THREE.LineSegments
    grid: THREE.GridHelper
  } | null>(null)

  React.useEffect((): void => {
    themeColors.current.theme = theme.theme

    themeColors.current = {
      ...themeColors.current,
      ...colorScheme,
    }

    if (renderer.current) {
      renderer.current.setClearColor(themeColors.current.crust)
    }
    if (rendererProperties.current) {
      if (rendererProperties.current.scene.fog) {
        rendererProperties.current.scene.fog.color = new THREE.Color(
          themeColors.current.crust,
        )
      }

      rendererProperties.current.cubeMesh.material =
        new THREE.MeshBasicMaterial({
          color: themeColors.current.base,
        })

      rendererProperties.current.cubeLines.material =
        new THREE.LineBasicMaterial({
          color:
            themeColors.current[themeColors.current.cubeLinesMaterialColor],
        })

      rendererProperties.current.scene.remove(rendererProperties.current.grid)
      rendererProperties.current.grid.dispose()
      rendererProperties.current.grid = new THREE.GridHelper(
        50,
        50,
        themeColors.current.text,
        themeColors.current.text,
      )
      rendererProperties.current.grid.position.setY(-1)
      rendererProperties.current.scene.add(rendererProperties.current.grid)
    }
  }, [theme, colorScheme])

  React.useEffect((): (() => void) | void => {
    try {
      const canvas = document.createElement('canvas')
      webGLSupported.current.value = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch {
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

      // renderer.current.shadowMap.enabled = true
      // renderer.current.shadowMap.type = THREE.PCFSoftShadowMap

      renderer.current.setClearColor('#ff0000');//themeColors.current.crust)

      rendererContainer.current.prepend(renderer.current.domElement)
    }

    if (!rendererProperties.current) {
      const scene: THREE.Scene = new THREE.Scene()
      scene.fog = new THREE.Fog(themeColors.current.crust, 0, 20)
      const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        90,
        rendererContainer.current.clientWidth /
          rendererContainer.current.clientHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 4, 5)
      camera.lookAt(0, 0, 0)

      const raycaster: THREE.Raycaster = new THREE.Raycaster()

      const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
      const cubeMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial(
        {
          color: themeColors.current.base,
        },
      )
      const cubeMesh: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

      const cubeEdges = new THREE.EdgesGeometry(cubeGeometry)
      const cubeLinesMaterial = new THREE.LineBasicMaterial({
        color: '#FFFFFF' //themeColors.current[themeColors.current.cubeLinesMaterialColor],
      })
      const cubeLines = new THREE.LineSegments(cubeEdges, cubeLinesMaterial)

      const cubeGroup: THREE.Group = new THREE.Group()
      cubeGroup.add(cubeMesh, cubeLines)

      scene.add(cubeGroup)

      const grid: THREE.GridHelper = new THREE.GridHelper(
        50,
        50,
        themeColors.current.base,
        themeColors.current.base,
      )
      grid.position.setY(-1)
      scene.add(grid)

      rendererProperties.current = {
        scene,
        camera,
        raycaster,
        cubeMesh,
        cubeGroup,
        cubeLines,
        grid,
      }
    }

    const rendererContainerCached: HTMLDivElement = rendererContainer.current

    const onMouseDown = (ev: MouseEvent): void => {
      if (ev.button !== 0) return

      const rect: DOMRect = rendererContainerCached.getBoundingClientRect()

      mousedDownPosition.current = new THREE.Vector2(
        ((ev.clientX - rect.left) / window.innerWidth) * 2 - 1,
        -((ev.clientY - rect.top) / window.innerHeight) * 2 + 1,
      )
    }
    rendererContainerCached.addEventListener('mousedown', onMouseDown)

    const onMouseMove = (ev: MouseEvent): void => {
      const rect: DOMRect = rendererContainerCached.getBoundingClientRect()

      mousePosition.current.set(
        ((ev.clientX - rect.left) / window.innerWidth) * 2 - 1,
        -((ev.clientY - rect.top) / window.innerHeight) * 2 + 1,
      )
    }
    rendererContainerCached.addEventListener('mousemove', onMouseMove)

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

    const animate: XRFrameRequestCallback = (): void => {
      if (
        !rendererProperties.current ||
        !rendererContainer.current ||
        !renderer.current
      ) {
        return
      }

      rendererProperties.current.cubeGroup.rotateX(0.01 / 2)
      rendererProperties.current.cubeGroup.rotateY(0.03 / 2)
      rendererProperties.current.cubeGroup.rotateZ(0.0079 / 2)

      rendererProperties.current.raycaster.setFromCamera(
        mousePosition.current,
        rendererProperties.current.camera,
      )

      const intersects: THREE.Intersection<THREE.Object3D>[] =
        rendererProperties.current.raycaster.intersectObject(
          rendererProperties.current.cubeMesh,
        )

      if (intersects && intersects[0]) {
        rendererContainer.current.style.cursor = 'pointer'

        rendererProperties.current.cubeGroup.scale.set(1.5, 1.5, 1.5)
      } else {
        rendererContainer.current.style.cursor = 'unset'

        const mouseDistanceFromCenter: number =
          Math.min(
            0.5,
            Math.max(
              Math.abs(mousePosition.current.x),
              Math.abs(mousePosition.current.y),
            ),
          ) / 0.5

        const scaleValue: number = (1 - mouseDistanceFromCenter) * 0.25

        rendererProperties.current.cubeGroup.scale.set(
          1 + scaleValue,
          1 + scaleValue,
          1 + scaleValue,
        )
      }

      if (mousedDownPosition.current) {
        rendererProperties.current.raycaster.setFromCamera(
          mousedDownPosition.current,
          rendererProperties.current.camera,
        )

        const clickIntersects: THREE.Intersection<THREE.Object3D>[] =
          rendererProperties.current.raycaster.intersectObject(
            rendererProperties.current.cubeMesh,
          )

        if (clickIntersects && clickIntersects[0]) {
          rendererProperties.current.cubeLines.material =
            new THREE.LineBasicMaterial({
              color:
                themeColors.current[
                  themeColors.current.progressCubeMaterialColor()
                ],
            })
        }

        mousedDownPosition.current = null
      }

      renderer.current.render(
        rendererProperties.current.scene,
        rendererProperties.current.camera,
      )
    }
    renderer.current.setAnimationLoop(animate)

    return (): void => {
      renderer.current?.setAnimationLoop(null)

      rendererContainerCached.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={rendererContainer}
      className={`${styles.container} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.fader} />
    </div>
  )
}
