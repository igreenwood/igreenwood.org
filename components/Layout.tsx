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
      </Head>
      <header>
        <div className = { styles.toolbar }>
          <h1 className ={ styles.toolbarTitle }><Link href="/"><a>{ title }</a></Link></h1>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a>Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/bio">
                  <a>Info</a>
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
      <footer className={ styles.footer }>
        <hr />
        <span>©︎ igreenwood</span>
      </footer>
    </div>
  )
}
