import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Layout({ children, title = '' }: Props) {
  return (
    <div className= { styles.container }>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Karma:wght@300&display=swap" rel="stylesheet"/>
      </Head>
      <header>
        <div className = { styles.toolbar }>
          <h1 className ={ styles.toolbarTitle }><Link href="/"><a>{ title }</a></Link></h1>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a>Works</a>
                </Link>
              </li>
              <li>
                <Link href="/bio">
                  <a>Bio</a>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                  <a>Posts</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}
