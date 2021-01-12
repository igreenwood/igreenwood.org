import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Layout.module.css';
import { OgData } from '../interfaces';
import HamburgerMenu from './HamburgerMenu';
import { useState } from 'react';
import HamburgerOverlay from './HamburgerOverlay';

type Props = {
  children?: ReactNode;
  title?: string;
  ogData?: OgData;
};

export default function Layout({
  children,
  title = 'igreenwood.org',
  ogData = {
    title: 'Issei Aoki',
    type: 'website',
    url: 'https://www.igreenwood.org',
    image: 'https://igreenwood.org/images/cover3.jpg',
  },
}: Props) {
  const siteName = 'igreenwood.org';
  const description = 'Issei Aoki is Tokyo based software engineer.';
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={ogData.title} />
        <meta property="og:type" content={ogData.type} />
        <meta property="og:url" content={ogData.url} />
        <meta property="og:image" content={ogData.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://igreenwood.org/images/cover3.jpg"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.jpg"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/ress/dist/ress.min.css"
        />

        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-Thin.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-UltraLight.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-Light.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-Medium.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-SemiBold.ttf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/WeeklyAlt/WeeklyAlt-Bold.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <header className={styles.siteHeader}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarTitle}>
            <h1>
              <Link href="/">
                <a>{title}</a>
              </Link>
            </h1>
          </div>
          <nav className={styles.toolbarMenu}>
            <div className={styles.normalMenu}>
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
            </div>
            <div className={styles.hamburgerMenu}>
              <HamburgerMenu isOpen={isOpen} onClick={toggleMenu} />
            </div>
          </nav>
        </div>
      </header>
      <div className={styles.toolbarOffset} />
      <main>{children}</main>
      <footer className={styles.footer}>
        <hr />
        <div className={styles.rights}>
          <span>©︎ 2020 igreenwood</span>
        </div>
      </footer>
      <HamburgerOverlay isVisible={isOpen} onClick={toggleMenu} />
    </div>
  );
}
