import type { Metadata } from 'next'

import Image from 'next/image'
import { redirect } from 'next/navigation'

import { Footer, Header } from '@/components'

import styles from '@/app/72/page.module.scss'

export const metadata: Metadata = {
  title: '72',
  description: '119',
}

interface STImage {
  title?: string
  description?: string
  alt?: string
  url: string
}

interface STPage {
  title?: string
  images: STImage[]
}

const pages: STPage[] = [
  {
    title: 'Some title',
    images: [{ url: `/4a03107ee9f15ae9b82cedbaa4ee027f042f5d87.jpeg` }],
  },
  { images: [{ url: `/4e41743b2fb8e9f358722d057c531ee785b0b862.jpeg` }] },
  { images: [{ url: `/23u5i3.png` }] },
  { images: [{ url: `/131ee4045b158af250e7b47a148729ef.jpeg` }] },
  { images: [{ url: `/234uo9.png` }] },
  { images: [{ url: `/257a9d14c005c3eaf3a1255d6296b8518da12f9d.jpeg` }] },
  { images: [{ url: `/47238fa52baad6ecdd6fb7741557de2ecbe412c8.jpeg` }] },
  { images: [{ url: `/ad6ddd79494120eae3443ce861855f52.jpeg` }] },
  { images: [{ url: `/efe1e1e6e17923712943fecd5060f5dd.jpeg` }] },
  { images: [{ url: `/htri2o.png` }] },
  { images: [{ url: `/j24ihg.png` }] },
]

export default async function SevenTwoPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}): Promise<React.ReactElement> {
  'use server'

  let selectedPage: number =
    searchParams?.p && typeof searchParams.p === 'string'
      ? parseInt(searchParams.p)
      : 1

  if (selectedPage <= 0 || isNaN(selectedPage)) {
    return redirect(`/72`)
  } else if (selectedPage > pages.length) {
    return redirect(`/72?p=${pages.length}`)
  }

  selectedPage--

  return (
    <main>
      <div className={styles.content}>
        {pages[selectedPage].title ? (
          <h2>{pages[selectedPage].title}</h2>
        ) : (
          <></>
        )}
        <div className={styles.images}>
          {pages[selectedPage].images.map(
            (image: STImage, index: number): React.ReactElement => (
              <div key={image.url + index}>
                {image.title ? <h3>{image.title}</h3> : <></>}
                <Image src={image.url} alt={image.alt ?? image.url} fill />
                {image.description ? <p>{image.description}</p> : <></>}
              </div>
            ),
          )}
        </div>
      </div>

      <Footer />
      <Header minimal />
    </main>
  )
}
