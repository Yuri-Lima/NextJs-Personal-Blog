import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout'
import Date from '../../components/date';
import { getAllPostFilesIds, getAllMeduimPostsIds, getPostFileDataById, fetchMediumPosts } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.pubDate} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml ||  postData.description}} />
        <div className={utilStyles.lightText}>
          <small><p>Author: {postData.author}</p></small>
        </div>
        <div className={utilStyles.lightText}>
        <small><p>Source: <Link href={postData.guid}>{postData.title}</Link></p></small>
        </div>
        <div className={utilStyles.lightText}>
          <small><p>Categories: {postData.categories}</p></small>
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const filePostPaths = await getAllPostFilesIds()
  const mediumPaths = await getAllMeduimPostsIds()
  return {
    paths: filePostPaths.concat(mediumPaths),
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  let postData = await getPostFileDataById(params.id);
  let mediumPosts = await fetchMediumPosts()
  mediumPosts = mediumPosts.filter(post => post.title === params.id)
  postData = mediumPosts.length > 0 ? mediumPosts[0] : postData
  return {
    props: {postData},
    revalidate: 10
  }
}