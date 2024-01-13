'use client'

import React from 'react'

let noScrollStyles: CSSStyleSheet

export function useNoPageScroll(): void {
  React.useEffect((): (() => void) => {
    if (!noScrollStyles) {
      noScrollStyles = new CSSStyleSheet({ disabled: false })
      noScrollStyles.insertRule(`
        html,
        body,
        :root {
          overflow: hidden;
        }
      `)
    }

    if (!document.adoptedStyleSheets.includes(noScrollStyles)) {
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        noScrollStyles,
      ]
    } else {
      noScrollStyles.disabled = false
    }

    return (): void => {
      noScrollStyles.disabled = true
    }
  }, [])
}

export function NoPageScroll(): JSX.Element {
  useNoPageScroll()

  return <></>
}
