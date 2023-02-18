import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedFilesPostsData, getSortedMediumPostsData } from '../lib/posts';

/**
 * @description Get static props from getSortedPostsData
 * @returns props
 */
export async function getStaticProps() {
  const allPostsData = await getSortedFilesPostsData();
  const allPostsDataMedium = await getSortedMediumPostsData();

  return {
    props: {
      allPostsData: allPostsData.concat(allPostsDataMedium) || []
    },
    revalidate: 10 // In seconds (10 seconds)
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/* Display the title */}
      <section className={utilStyles.headingMd}>
        <p>Dev. BackEnd NODEJS | TS -{'>'} enthusiast | NextJs | React</p>
      </section>

      {/* Display all posts */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, pubDate, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <Date dateString={pubDate} />
            </li>
          ))}
        </ul>
      </section>
      
    </Layout>
  );
}