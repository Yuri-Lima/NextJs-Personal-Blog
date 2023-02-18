import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Yuri Lima';
export const siteTitle = 'Next.js Yuri Lima';

// MetaData
const metaData = {
    title: 'Yuri Lima',
    description: 'Yuri Lima - Desenvolvedor Full Stack',
    image: '/images/profile.jpg',
    url: 'https://yurilima.dev',
    type: 'website',
    locale: 'pt_BR',
    site_name: 'Yuri Lima',
    twitter: '@yurilima_dev',
    twitter_card: 'summary_large_image',
    twitter_creator: '@yurilima_dev',
    twitter_site: '@yurilima_dev',
    og_title: 'Yuri Lima',
    og_description: 'Yuri Lima - Desenvolvedor Full Stack',
    og_image: '/images/profile.jpg',
    og_url: 'https://yurilima.dev',
    og_type: 'website',
    og_locale: 'pt_BR',
    og_site_name: 'Yuri Lima',
    og_image_width: '1200',
    og_image_height: '630',
    og_image_type: 'image/jpeg',
    og_image_alt: 'Yuri Lima',
    fb_app_id: '1234567890',
    fb_pages: '1234567890',
    fb_admins: '1234567890',
    fb_app_id: '1234567890',
    fb_pages: '1234567890',
    fb_admins: '1234567890',
    google_site_verification: '1234567890',
    msvalidate_01: '1234567890'
}

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.png"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}