import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

export default function Layout({ children, title = 'igreenwood.com' }: Props) {
  return (
    <div className= { styles.container }>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css"/>

        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-Thin.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-UltraLight.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-Light.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-Regular.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-Medium.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-SemiBold.ttf" as="font" crossOrigin=""/>
        <link rel="preload" href="/fonts/WeeklyAlt/WeeklyAlt-Bold.ttf" as="font" crossOrigin=""/>

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
                <Link href="/info">
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
      <main>
        {children}
      </main>
      <footer className={ styles.footer }>
        <hr />
        <div className={ styles.rights }>
          <span>©︎ 2020 igreenwood</span>
        </div>
      </footer>
    </div>
  )
}
