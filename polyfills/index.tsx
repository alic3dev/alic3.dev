import React from 'react'

import { cryptoRandomUUIDPolyfill } from '@/polyfills/cryptoRandomUUID'

export { cryptoRandomUUIDPolyfill }

export function AllPolyfills(): React.ReactNode {
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
          ${cryptoRandomUUIDPolyfill.toString()}

          if (!Object.prototype.hasOwnProperty.call(window.crypto, 'randomUUID')) {
            window.crypto.randomUUID = ${cryptoRandomUUIDPolyfill.name};
          }
        `,
      }}
    />
  )
}
