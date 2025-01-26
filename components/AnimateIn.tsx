import React from 'react'

import styles from '@/components/AnimateIn.module.scss'

type AnimationType = 'fade' | 'slide'
type AnimationTrigger = 'immediate' | 'scroll'

export function AnimateIn({
  // animations = [],
  // trigger = 'scroll',
  className = '',
  children,
}: React.PropsWithChildren<{
  animations: AnimationType[]
  trigger: AnimationTrigger
  className?: string
}>): React.ReactElement {
  // const animationStyles = React.useMemo(() => {
  //   for (const animation of animations) {
  //   }
  // }, [animations])

  return <div className={`${styles.wrapper} ${className}`}>{children}</div>
}
